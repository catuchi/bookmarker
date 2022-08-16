// listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  // get form values
  const siteName = document.getElementById("siteName").value;
  const siteUrl = document.getElementById("siteUrl").value;

  const bookmark = {
    name: siteName,
    url: siteUrl,
  };

  /*
  // local storage test
    localStorage.setItem("test", "Hello world");
    console.log(localStorage.getItem("test"));
    localStorage.removeItem("test");
    console.log(localStorage.getItem("test"));
  */

  // test if bookmarks is null
  if (!localStorage.getItem("bookmarks")) {
    let bookmarks = [];

    bookmarks.push(bookmark);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    bookmarks.push(bookmark);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  e.preventDefault();
}
