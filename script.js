// page elements that JavaScript needs to control.
const TopBar = document.querySelector('[data-header]');
const MenuBtn = document.querySelector('[data-menu-button]');
const Links = document.querySelector('[data-nav]');
const FooterYear = document.querySelector('[data-year]');


// changes top menu after page has been scrolled
function CheckScroll() {
  if (window.scrollY > 18) {
    TopBar?.classList.add('Scrolled');
  } else {
    TopBar?.classList.remove('Scrolled');
  }
}


// close phone nav menu
function CloseMenu() {
  MenuBtn?.setAttribute('aria-expanded', 'false');
  Links?.classList.remove('MenuOpen');
  document.body.classList.remove('NoScroll');
}


// open/ close phone menu when the button is pressed
MenuBtn?.addEventListener('click', function () {
  const MenuIsOpen =
    MenuBtn.getAttribute('aria-expanded') === 'true';

  MenuBtn.setAttribute(
    'aria-expanded',
    String(!MenuIsOpen)
  );

  Links?.classList.toggle(
    'MenuOpen',
    !MenuIsOpen
  );

  document.body.classList.toggle(
    'NoScroll',
    !MenuIsOpen
  );
});


// close menu after one of its links is selected
Links?.querySelectorAll('a').forEach(function (Link) {
  Link.addEventListener('click', CloseMenu);
});


// check the menu whenever page is scrolled
window.addEventListener(
  'scroll',
  CheckScroll,
  { passive: true }
);


// close the phone menu if screen becomes wide again
window.addEventListener('resize', function () {
  if (window.innerWidth > 760) {
    CloseMenu();
  }
});


// run the scroll check when the website first opens
CheckScroll();


// auto display the current year in the footer
if (FooterYear) {
  FooterYear.textContent =
    String(new Date().getFullYear());
}


// find everything that should fade into view
const FadeItems =
  document.querySelectorAll('.FadeIn');


// check if browser supports the animation
if (
  'IntersectionObserver' in window &&
  !window
    .matchMedia('(prefers-reduced-motion: reduce)')
    .matches
) {

  // watch for items entering the visible screen
  const PageWatcher =
    new IntersectionObserver(function (Items) {

      Items.forEach(function (Item) {
        if (Item.isIntersecting) {
          Item.target.classList.add('Visible');
          PageWatcher.unobserve(Item.target);
        }
      });

    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px'
    });


  // start watching every fade-in item
  FadeItems.forEach(function (Item) {
    PageWatcher.observe(Item);
  });

} else {

  // show all if animations are unavailable
  FadeItems.forEach(function (Item) {
    Item.classList.add('Visible');
  });
}