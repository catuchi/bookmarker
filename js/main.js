// listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  // get form values
  let siteName = document.getElementById("siteName").value;
  let siteUrl = document.getElementById("siteUrl").value;

  if (!validateForm(siteName, siteUrl)) {
    document.getElementById("siteName").value = "";
    document.getElementById("siteUrl").value = "";
    return false;
  }

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

  fetchBookmarks();

  // set input values to empty
  document.getElementById("siteName").value = "";
  document.getElementById("siteUrl").value = "";

  e.preventDefault();
}

// delete bookmark
function deleteBookmark(url) {
  // Fetch bookmarks from local storage
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  let newBookmarks = bookmarks.filter((bookmark) => {
    if (bookmark.url !== url) {
      return bookmark;
    }
  });

  console.log(newBookmarks);

  localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));

  fetchBookmarks();
}

function fetchBookmarks() {
  // Fetch bookmarks from local storage
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // get output id
  const bookmarksResults = document.getElementById("bookmarksResults");

  // build output
  let html = bookmarks
    .map(
      (bookmark) => `
    <div class='well'>
    <h3>
    ${bookmark.name} 
    <a class='btn btn-default' target='_blank' href='${bookmark.url}'>Visit</a> 
    <a onclick='deleteBookmark("${bookmark.url}")' class='btn btn-danger' href='#'>Delete</a> 
    </h3>
    </div>
    `
    )
    .join("");

  bookmarksResults.innerHTML = html;
}

function validateForm(siteName, siteUrl) {
  // error handling for form input
  if (!siteName || !siteUrl) {
    alert("Please fill in the form");
    return false;
  }

  // url validation
  var expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Please enter a valid URL");
    return false;
  }

  return true;
}
