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

// // スムーススクロール
// $('a[href^="#"]').click(function () {
//   const speed = 600;
//   const href = $(this).attr("href");
//   const target = $(href === "#" || href === "" ? "html" : href);
//   $("body,html").animate({ scrollTop: target.offset().top }, speed, "swing");
//   return false;
// });

// ⭐️スクロール時フェードイン（軽量化推奨）
// ===== 基本参照 =====
const nav = document.querySelector(".c-nav");
const main = document.querySelector("main");
const links = document.querySelectorAll(".c-nav_inner > a");

// mainの可視・不可視でnav表示制御
let inMain = false;
const io = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];
    inMain = entry.isIntersecting;
    if (inMain) {
      nav.classList.add("is-active");
    } else {
      nav.classList.remove("is-active", "is-clicked");
    }
  },
  { threshold: 0 }
);
io.observe(main);

// クリックで一旦非表示（is-clicked付与）
links.forEach((a) => {
  a.addEventListener(
    "click",
    () => {
      nav.classList.add("is-clicked");
    },
    { passive: true }
  );
});

// ===== jQuery スムーススクロールと衝突回避 =====
let isAutoScrolling = false; // 自動スクロール中フラグ
const offset = 150; // 上からの余白

$('a[href^="#"]').on("click", function () {
  const speed = 600;
  const href = $(this).attr("href");
  const $target = $(href === "#" || href === "" ? "html" : href);

  if ($target.length === 0) return false;

  const position = $target.offset().top - offset; // ← 余白を確保

  isAutoScrolling = true;
  $("html, body")
    .stop(true)
    .animate({ scrollTop: position }, speed, "swing", function () {
      setTimeout(() => {
        isAutoScrolling = false;
      }, 50);
    });
  return false;
});

// ===== ユーザー操作のスクロールで再表示 =====
let ticking = false;
window.addEventListener(
  "scroll",
  () => {
    if (!inMain) return; // mainが見えている時だけ
    if (isAutoScrolling) return; // 自動スクロール中は無視
    if (ticking) return;

    ticking = true;
    requestAnimationFrame(() => {
      nav.classList.remove("is-clicked");
      ticking = false;
    });
  },
  { passive: true }
);
