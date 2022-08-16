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

  console.log(bookmark);
  e.preventDefault();
}
