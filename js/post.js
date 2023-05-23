$(document).ready(function () {
  // 페이지 로드 시 초기 게시글 목록을 가져옵니다.
  fetchPosts();

  // 폼 제출 시 새로운 게시글을 작성합니다.
  $("#post-form").submit(function (event) {
    event.preventDefault();
    createPost();
  });
});

// 게시글 목록을 가져와서 화면에 표시합니다.
function fetchPosts() {
  $.ajax({
    url: "http://54.180.41.236:8080/board/viewlist",
    type: "GET",
    contentType: "application/json",
    success: function (posts) {
      // 서버로부터 가져온 게시글 목록을 처리합니다.
      displayPosts(posts);
    },
  });
}

// 게시글 목록을 화면에 표시합니다.
function displayPosts(posts) {
  var postList = $("#post-list");
  postList.empty();

  posts.forEach(function (post) {
    var listItem = $("<div></div>").text(
      post.id + "-" + post.title + "-" + post.author + " - " + post.content
    );
    postList.append(listItem);
  });
}

// 새로운 게시글을 작성합니다.
function createPost() {
  var title = $("#title-input").val();
  var content = $("#content-input").val();
  var author = $("#author-input").val();

  $.ajax({
    url: "http://54.180.41.236:8080/board/writepro",
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({
      title: title,
      content: content,
      author: author,
    }),
    success: function () {
      // 게시글 작성이 성공한 후에는 게시글 목록을 다시 가져옵니다.
      fetchPosts();
      // 작성한 게시글 입력 필드를 비웁니다.
      $("#title-input").val("");
      $("#content-input").val("");
    },
  });
}
