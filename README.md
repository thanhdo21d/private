# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { rateLimit } from 'express-rate-limit';
import express from 'express';
import { connectDb } from './configs/dataBase.configs.js';
import rootRoutes from './routers/root.js';
import morgan from 'morgan';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import xlsx from 'xlsx';
import ExcelJS from 'exceljs';
import { XlxsEasy } from './models/excel.models.js';
import Category from './models/categories.models.js';
import os from 'os';
import User from './models/users.models.js';
import axios from 'axios';
const app = express();
app.use(cors({ origin: ['http://localhost:3000', 'http://10.73.131.60'], credentials: true }));
app.use(helmet());
export const networkInterfaces = os.networkInterfaces();
export const hostname = os.hostname();
console.log(hostname);
connectDb();
const server = http.createServer(app);
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(
  session({
    secret: 'dmvn972524',
    resave: false,
    saveUninitialized: true,
  })
);
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   limit: 100,
//   standardHeaders: 'draft-7',
//   legacyHeaders: false,
// });
// app.use(limiter);
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
const upload = multer({ dest: 'uploads/' });
app.post('/upload/:id', upload.single('file'), async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  console.log(category);
  // tải lên file
  const workbook = xlsx.readFile(req.file.path);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);
  //ảnh
  const workbook1 = new ExcelJS.Workbook();
  const data = await workbook1.xlsx.readFile(req.file.path);
  const worksheet1 = workbook1.worksheets[0];
  // In ra JSON và lưu
  var today = new Date();
  var currentTimeInMillis = today.getTime();
  for (let i = 1; i < jsonData.length; i++) {
    const find = await XlxsEasy.findOne({ question: jsonData[i].question });
    var imgS = [];
    var FirstImg = '';
    var SecondImg = '';
    var ThirdImg = '';
    var FourthImg = '';
    for (const image of worksheet1.getImages()) {
      if (image.range.tl.nativeRow == i + 1) {
        const img = workbook1.model.media.find((m) => m.index === image.imageId);
        const name =
          currentTimeInMillis +
          image.range.tl.nativeRow +
          '.' +
          image.range.tl.nativeCol +
          '.' +
          img.name +
          '.' +
          img.extension;
        fs.writeFileSync(`./src/imgs/${name}`, img.buffer);
        // imgS.push(name)
        if (image.range.tl.nativeCol == 4) imgS.push(name);
        if (image.range.tl.nativeCol == 4) FirstImg = name;
        if (image.range.tl.nativeCol == 6) SecondImg = name;
        if (image.range.tl.nativeCol == 8) ThirdImg = name;
        if (image.range.tl.nativeCol == 10) FourthImg = name;
      }
    }
    console.log(jsonData[i]);
    let data = {
      no: jsonData[i].No,
      section: jsonData[i].Section,
      category_question: jsonData[i].question,
      question: jsonData[i]['__EMPTY'],
      choose: [
        { q: jsonData[i]['Đáp án'], img: FirstImg },
        { q: jsonData[i]['__EMPTY_3'], img: SecondImg },
        { q: jsonData[i]['__EMPTY_5'], img: ThirdImg },
        { q: jsonData[i]['__EMPTY_7'], img: FourthImg },
      ],
      answer: jsonData[i]['đáp án đúng'],
      image: imgS,
      point: jsonData[i]['điểm số'],
    };
    if (!find) {
      const examEasy = new XlxsEasy(data);
      console.log(data);
      console.log(imgS);
      await examEasy.save();
      console.log(category, 'ok');
      await Category.findByIdAndUpdate(
        category._id,
        {
          $addToSet: {
            easy: examEasy._id,
          },
        },
        {
          new: true,
        }
      );
    }
  }
  res.json(jsonData);
});
const port = process.env.PORT || 5000;
const host = process.env.HOST;
app.use(rootRoutes);
app.use(express.static('src/imgs'));
server.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
app.post('/import/user/:id', upload.single('file'), async (req, res) => {
  console.log(req.params.id);
  const workbook = xlsx.readFile(req.file.path);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);
  for (let i = 0; i < jsonData.length; i++) {
    const find = await User.findOne({
      employeeCode: { $regex: new RegExp(jsonData[i].employeeCode, 'i') },
    });
    if (find) {
      try {
        console.log(find._id);
        await Category.findByIdAndUpdate(
          req.params.id,
          { $push: { users: [find._id] } },
          {
            new: true,
          }
        );
      } catch (error) {
        return res.status(404).json({
          message: error.message,
        });
      }
    }
    let data = jsonData[i];
    if (!find) {
      let dataUser = new User({
        employeeCode: data.employeeCode,
        password: '1234qwer!',
      });
      const dataUserCatgories = await dataUser.save();
      await Category.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { users: dataUserCatgories._id } },
        { new: true }
      );
    }
  }
  res.json(jsonData);
});
app.post('/upload/dynamic/:id', upload.single('file'), async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  console.log(category);
  // Tải lên và đọc file Excel
  const workbook = xlsx.readFile(req.file.path);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);
  // Xử lý ảnh
  const workbook1 = new ExcelJS.Workbook();
  await workbook1.xlsx.readFile(req.file.path);
  const worksheet1 = workbook1.worksheets[0];
  var today = new Date();
  var currentTimeInMillis = today.getTime();
  for (let i = 1; i < jsonData.length; i++) {
    const find = await XlxsEasy.findOne({ question: jsonData[i].question });
    var questionImages = [];
    var answerChoices = [];
    // Xử lý ảnh cho câu hỏi và các câu trả lời
    for (const image of worksheet1.getImages()) {
      if (image.range.tl.nativeRow == i + 1) {
        const img = workbook1.model.media.find((m) => m.index === image.imageId);
        const imgName =
          currentTimeInMillis +
          image.range.tl.nativeRow +
          '.' +
          image.range.tl.nativeCol +
          '.' +
          img.name +
          '.' +
          img.extension;
        fs.writeFileSync(`./src/imgs/${imgName}`, img.buffer);
        // Phân loại và lưu trữ ảnh dựa trên vị trí cột
        if (image.range.tl.nativeCol <= 3) {
          // Giả sử ảnh câu hỏi nằm ở cột 3 trở xuống
          questionImages.push(imgName);
        } else {
          // Ảnh của các câu trả lời
          answerChoices.push({ col: image.range.tl.nativeCol, img: imgName });
        }
      }
    }
    // Xử lý câu trả lời
    let answers = [];
    let answerCol = 4; // Giả sử cột đáp án bắt đầu từ cột 4
    while (jsonData[i][`__EMPTY_${answerCol - 1}`]) {
      let answerImages = answerChoices.filter((ac) => ac.col === answerCol).map((ac) => ac.img);
      answers.push({ q: jsonData[i][`__EMPTY_${answerCol - 1}`], imgs: answerImages });
      answerCol += 2; // Giả sử mỗi cặp đáp án và hình ảnh cách nhau 2 cột
    }
    let data = {
      no: jsonData[i].No,
      section: jsonData[i].Section,
      category_question: jsonData[i].question,
      question: jsonData[i]['__EMPTY'],
      question_images: questionImages,
      answers: answers,
      correct_answer: jsonData[i]['đáp án đúng'],
      point: jsonData[i]['điểm số'],
    };
    if (!find) {
      const examEasy = new XlxsEasy(data);
      console.log(data);
      await examEasy.save();
      console.log(category, 'ok');
      await Category.findByIdAndUpdate(
        category._id,
        { $addToSet: { easy: examEasy._id } },
        { new: true }
      );
    }
  }
  res.json(jsonData);
});
import categorie from './models/categories.models.js';
async function createFolder(arr, parentId, categorie) {
  for (const [key, value] of Object.entries(arr)) {
    if (value != false) {
      const checkExist = await categorie.findOne({ parent: parentId, name: key });
      if (true) {
        const para = new categorie({
          name: key,
          parentCheck: '',
          parent: parentId,
          children: [],
          easy: [],
          users: [],
          examsKT: [],
        });
        await para.save();

        await categorie.findByIdAndUpdate(
          parentId,
          { $push: { children: { $each: [para._id] } } },
          {
            new: true,
          }
        );
        await createFolder(value, para._id, categorie);
      }
    } else {
      const para = new categorie({
        name: key,
        parentCheck: '',
        parent: parentId,
        children: [],
        easy: [],
        users: [],
        examsKT: [],
      });

      await para.save();

      await categorie.findByIdAndUpdate(
        parentId,
        { $push: { children: { $each: [para._id] } } },
        {
          new: true,
        }
      );
    }
  }
}
app.post('/add/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  await createFolder(body, id, categorie);
  res.json(body);
});

// No	Section	Category_question	Question	Điểm Số	Ảnh Câu Hỏi 1	Ảnh Câu Hỏi 2	Đáp Án A	Ảnh Đáp Án A1	Ảnh Đáp Án A2	Đáp Án B	Ảnh Đáp Án B1	...	Đáp Án Đúng



function equal(prevProp: any, nextProp: any) {
  if (prevProp.category === nextProp.category) {
    return true
  }
  return false
}

const [dataCategoriess, setDataCategories] = useState<any[]>([])

// Tạo một biến memoizedDataCategoriess để lưu trữ kết quả tính toán
const memoizedDataCategoriess = useMemo(() => {
  const savedCategories = sessionStorage.getItem('categories')

  if (savedCategories) {
    return JSON.parse(savedCategories)
  } else if (dataCategoriTree) {
    const newDataCategories = [dataCategoriTree]
    sessionStorage.setItem('categories', JSON.stringify(newDataCategories))
    return newDataCategories
  }

  return []
}, [idCate, dataCategoriTree])

useEffect(() => {
  // Gán giá trị của memoizedDataCategoriess vào dataCategoriess
  setDataCategories(memoizedDataCategoriess)
}, [memoizedDataCategoriess])

// Sử dụng dataCategoriess trong render
{dataCategoriess?.map((category: any) => {
  return (
    <CategoryTreeItem
      key={category?._id}
      category={category}
      level={0}
      bg={true}
      button={true}
      createExams={true}
      checkMember={true}
    />
  )
})}



- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
