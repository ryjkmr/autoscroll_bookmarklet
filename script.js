autoscroll = '';//某サイトの自動スクロール機能を無効にする。ブックマークレットとして使う時のみ有効にする
const AUTOSCROLL_STEP = 2;//1回のスクロール幅。処理が間に合わない時はこれを大きくする
var autoScroll_start = 0;
var elm = document.documentElement;
var autoScroll_end = elm.scrollHeight - elm.clientHeight;;
var autoScroll_time = 30;
var autoScroll_lastScrollPosition = 0;
let isTimerOn = false;//自動スクロールを実行中かどうかのフラグ
var autoScrollTimer;
window.addEventListener('keydown', function (event) {
  if (isTimerOn) {
    console.log('timer cleared');
    clearInterval(autoScrollTimer);//自動スクロール中に何かキーが押されたら止める
    isTimerOn = false;
    return;
  }
  console.log(event.code);
  switch (event.code) {
    case 'KeyA'://先頭位置を設定
      autoScroll_start = window.pageYOffset;
      break;
    case 'KeyB'://最終位置を設定
      autoScroll_end = window.pageYOffset;
      break;
    case 'KeyT'://スクロール時間＝曲の長さを入力。ダイアログでは3分15秒なら'3 15'のように分と秒を半角スペースで区切って入力
      const userInput = window.prompt('スクロールにかける時間(min sec)を入力');
      const temp = userInput.split(' ');
      autoScroll_time = parseInt(temp[0]) * 60 + parseInt(temp[1]);
      if (!autoScroll_time) { //正しい入力がなければアラートを出してデフォルト値に戻す
        autoScroll_time = '30';
        alert('エラー：分と秒を空白で区切って入力して下さい');
      }
      console.log(autoScroll_time);
      break;
    case 'KeyS'://自動スクロールを開始
      window.scrollTo(0, autoScroll_start);
      const autoScroll_interval = autoScroll_time / (autoScroll_end - autoScroll_start) * 1000 * AUTOSCROLL_STEP;//スクロール速度の計算
      console.log(autoScroll_interval);
      autoScrollTimer = setInterval(function () {
        window.scrollBy({
          left: 0, top: AUTOSCROLL_STEP, behavior: 'smooth'
        });
        if (window.pageYOffset >= autoScroll_end) clearInterval(autoScrollTimer);
      }, autoScroll_interval);
      isTimerOn = true;
      break;
  }
});