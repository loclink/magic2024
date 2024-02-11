import inquirer from 'inquirer';
import { getRandomNum } from 'tianjie';
export const runAction = async () => {
  const originArr = [];

  while (originArr.length < 4) {
    originArr.push(getRandomNum(1, 100));
  }
  console.log('已取到四个数字(卡片): ', originArr);
  console.log('');
  let newArr = [...originArr, ...originArr];
  console.log('已撕牌并摆放完毕: ', newArr);
  console.log('');
  const result = await inquirer.prompt([
    {
      name: 'nameNum',
      type: 'input',
      message: '请问您的姓名一共几个字?'
    },
    {
      name: 'region',
      type: 'list',
      message: '请问你的家乡属于?',
      choices: [
        {
          name: '南方',
          value: 1
        },
        {
          name: '北方',
          value: 2
        },
        {
          name: '可南可北',
          value: 3
        }
      ]
    },
    {
      name: 'sex',
      message: '请问您的性别是?',
      type: 'list',
      choices: [
        {
          name: '男生',
          value: 1
        },
        {
          name: '女生',
          value: 2
        }
      ]
    }
  ]);

  console.log('');
  if (isNaN(Number(result.nameNum))) {
    console.log('名称数量输入格式不正确');
    process.exit(1);
  }

  // 执行名字数量排序
  const nameNum = Math.round(Number(result.nameNum));
  for (let index = 0; index < nameNum; index++) {
    const val = newArr.shift();
    newArr.push(val);
  }

  // 拿起顶部三张放入在任意中间
  newArr = insertCard(newArr, 3);

  // 保存神秘牌
  const mysteryNumber = newArr.shift();
  console.log('已保存一张神秘牌');

  // 根据家乡把顶部牌放到中间
  insertCard(newArr, result.region);

  //根据男生女生丢顶部牌，男生丢一张，女生丢两张
  for (let index = 0; index < result.sex; index++) {
    newArr.shift();
  }

  console.log('见证奇迹的时刻');
  for (let index = 0; index < '见证奇迹的时刻'.length; index++) {
    const val = newArr.shift();
    newArr.push(val);
  }
  console.log('好运留下来, 烦恼丢出去');
  while (newArr.length > 1) {
    const val = newArr.shift();
    newArr.push(val);

    newArr.shift();
  }
  newArr.push(mysteryNumber);

  console.log('最终结果: ', newArr);
  return;
};

// 从顶部取牌插入值中间
const insertCard = (cardArr: number[], cardNum: number) => {
  let newArr = [...cardArr];
  const middle = newArr.slice(0, cardNum);
  newArr = newArr.filter((_, index) => index >= cardNum);
  const middleNum = getRandomNum(1, newArr.length - 2);
  const before = newArr.slice(0, middleNum);
  const later = newArr.slice(middleNum, newArr.length);
  newArr = [...before, ...middle, ...later];
  return newArr;
};
