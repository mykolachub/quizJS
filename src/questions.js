export async function getAnswersAndQuestions() {
  let responceObj = {};
  await axios({
    url: 'https://wrapapi.com/use/lifipp/firstrepo/victorinaQuset2/0.0.4',
    method: 'post',
    data: {
      'wrapAPIKey': 'NJsbYb1dcypO3Jj3vYmUG0kkj6NyxTkD'
    }
  }).then(
    res => {
      // responceObj = res.data.data;
      responceObj.options = res.data.data.answers;
      responceObj.question = res.data.data.question;
      responceObj.id = res.data.data.id;
    },
    err => {
      alert('Error, parse data. Code:' + err.status);
      responceObj = {};
    }
  );

  await axios.post('https://wrapapi.com/use/lifipp/firstrepo/chevictorinaAnswers/latest', {
    'id': responceObj.id,
    'wrapAPIKey': 'NJsbYb1dcypO3Jj3vYmUG0kkj6NyxTkD'
  }).then(
    res => {
      const str = res.data.data.output;
      const correctAnswer = (str.slice(str.indexOf(':') + 2));
      responceObj.answer = correctAnswer;
    },
    err => {
      alert('Error parse correctAnswer. Code:' + err.status);
      responceObj = {};
    }
  );

  return responceObj;
}
