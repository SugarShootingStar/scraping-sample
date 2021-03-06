const axios = require('axios');
const cheerio = require('cheerio');

async function main(){
  const newsList = await fetchNewsList();
  console.log(newsList);
}

// 記事のタイトルとリンク一覧を取得
function fetchNewsList() {
  return new Promise((resolve, reject) => {
    axios.get('https://gigazine.net/').then((res) => {
      console.log(res.data);
      const $ = cheerio.load(res.data);
      resolve($('div.card > h2 > a').map(extractionNews).get());
    });
  });
}

// 必要な情報のみ抽出
function extractionNews(i, el) {
  // 最後の方にある広告は取得したくない
  if(!el.attribs.title) return;

  return {
    title: el.attribs.title,
    link: el.attribs.href
  }
}

main();