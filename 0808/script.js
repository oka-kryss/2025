// URLパラメータ削除
const url = new URL(window.location.href);
const params = url.searchParams;
params.delete("username");
params.delete("mode");
history.replaceState("", "", url.pathname);

// ローディング処理と初期アニメーション
$(document).ready(function () {
  $(".loader").delay(500).fadeOut(500);
  $(".loader-bg")
    .delay(800)
    .fadeOut(700)
    .promise()
    .done(function () {
      $(".logo").fadeIn(900);
      $(".mv-anime").addClass("is-loaded");
      $(".pop").addClass("is-loaded");
      $(".p-mv-ttl").addClass("is-loaded");
      $(".p-mv-subttl").addClass("is-loaded");
    });
});

// スムーススクロール
$('a[href^="#"]').click(function () {
  const speed = 400;
  const href = $(this).attr("href");
  const target = $(href === "#" || href === "" ? "html" : href);
  $("body,html").animate({ scrollTop: target.offset().top }, speed, "swing");
  return false;
});

// MVスライド幅調整
function setSlideAmount() {
  const container = document.querySelector(".p-mv-imgCont_sp");
  const inner = document.querySelector(".p-mv-imgCont_sp__inner");
  if (!container || !inner) return;
  const slideAmount = container.offsetWidth - inner.scrollWidth;
  inner.style.setProperty("--slide-amount", `${slideAmount}px`);
}
window.addEventListener("DOMContentLoaded", setSlideAmount);
window.addEventListener("resize", setSlideAmount);

// スクロール時フェードイン（軽量化推奨）
$(window).on("scroll", function () {
  $(".fadeIn").each(function () {
    if (
      $(window).scrollTop() >
      $(this).offset().top - $(window).height() + 100
    ) {
      $(this).addClass("is-active");
    }
  });
});
