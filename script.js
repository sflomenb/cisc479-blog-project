

var pages = ['home', 'new-post', 'post-detail'];

var posts = [];

var hasVoted = [];

var myDB = new Firebase('https://sflomenb-blog.firebaseio.com/');

var myDBPosts = myDB.child("posts");

var savePosts = function() {
  myDBPosts.set(posts);
};

var saveVotes = function() {
  localStorage.setItem("votes", JSON.stringify(hasVoted));
}

var Post = function(title,content,author){
  this.title = title;
  this.content = content;
  this.author = author;
  this.score = 0;
  //var that = this;
  //addEventListener(that,'click',submit);
};


// var currentPageIndex = -1;
// var showNextPage = function(){
//   currentPageIndex = (currentPageIndex + 1) % pages.length;
//   var template = document.getElementById(pages[currentPageIndex]).innerHTML;
//   //do stuff to template here
//   display.innerHTML = template;
// }

var displayHome = function() {
  
  // posts = JSON.parse(localStorage.getItem("posts")) || posts;
  
  myDBPosts.on("value", function(snapshot) {
  var theData = snapshot.val();
  // console.log(JSON.stringify(theData));
  posts = theData || posts;
  hasVoted = JSON.parse(localStorage.getItem("votes")) || hasVoted;
  // console.log("snapshot",posts);
  if(hasVoted.length == 0) {
    for(var i = 0; i< posts.length; i++) {
      hasVoted[i] = false;
    }
    localStorage.setItem("votes", JSON.stringify(hasVoted));
  }
  loadHome();
});
  
  // console.log("after snapshot",posts);
  
  /*$home.innerHTML = "";
        
  var $homeHeader = document.createElement('h1');
  $homeHeader.setAttribute('id', 'home-header');
  $homeHeader.innerHTML = "Welcome to my blog";
  $home.appendChild($homeHeader);
  
  var mybr = document.createElement('br');
  $home.appendChild(mybr);

  var $but = document.createElement('div');
  $but.setAttribute('id', 'new-post');
  $but.classList.add('but');
  $but.innerHTML = "Add Post";
  $home.appendChild($but);
  
  var $flex = document.createElement('div');
  // $flex.setAttriflexe('id', 'new-post');
  $flex.classList.add('post-list');
  // $flex.innerHTML = "Add Post";
  $home.appendChild($flex);*/
  
  
}

var loadHome = function() {
  var $home = document.getElementById("home");
  var $postList = document.getElementById("post-list");
  
  $postList.innerHTML = "";
  
  if(posts.length > 0) {
    posts.forEach(function(post) {
      
      var $upArrow = document.createElement('div');
      $upArrow.classList.add("arrow-up");
      $upArrow.innerHTML = "^";
      $upArrow.addEventListener('click',function(){
        if(!hasVoted[posts.indexOf(post)]) {
          hasVoted[posts.indexOf(post)] = true;
          saveVotes();
          post.score += 1;
          $score.innerHTML = post.score;
          savePosts();
        }
      });
      
      var $score = document.createElement('div');
      //$score.classList.add("post-left");
      $score.innerHTML = post.score;
      
      var $downArrow = document.createElement('div');
      $downArrow.classList.add("arrow-down");
      $downArrow.innerHTML = "v";
      $downArrow.addEventListener('click',function(){
        if(!hasVoted[posts.indexOf(post)]) {
          hasVoted[posts.indexOf(post)] = true;
          saveVotes();
          post.score -= 1;
          $score.innerHTML = post.score;
          savePosts();
        }
      });
      
      var $postLeft = document.createElement('div');
      $postLeft.classList.add("post-left");
      $postLeft.appendChild($upArrow);
      $postLeft.appendChild($score);
      $postLeft.appendChild($downArrow);
      
      
      var $showText = document.createElement('div');
      $showText.classList.add("post-text");
      $showText.innerHTML = "<span class='home-post-title'>" + post.title+ "</span>" + "<br>by " + post.author + "<br><br>" + post.content.replace(/<br>/g," ").replace(/&nbsp;/g," ").substring(0,30) + "...";
      $showText.addEventListener('click',function(){
        displayPostDetails(post);
      });
      
      var $showPost = document.createElement('div');
      $showPost.classList.add("post");
      
      $showPost.appendChild($postLeft);
      $showPost.appendChild($showText);
      
      $postList.appendChild($showPost);
     
    });
  }
  else {
    // var $noPosts2 = "<p>No posts yet.</p>"
    // var $noPosts = document.createElement('p');
    // $noPosts.innerHTML = "No posts yet, write one!";
    // var body = document.getElementById("home").innerHTML;
    // body += $noPosts2;
  }
  $home.classList.remove('hidden');
  document.getElementById("new-post-but").addEventListener('click',displayNewPost);
  // document.getElementsByClassName("post").addEventListener('click', displayPostDetails);
}

var displayPostDetails = function(post) {
  document.getElementById(pages[0]).classList.add('hidden');
  
  var $detail = document.getElementById("post-detail");
  
  $detail.innerHTML = "";
  
  // var $postContent = document.createElement('div');
  // $detail.appendChild($postContent);
  
  // var $but = document.createElement('button');
  // $but.setAttribute('id', 'back');
  // $but.innerHTML = "Home";
  // $detail.appendChild($but);
  
  var $goHome = document.createElement('div');
  $goHome.setAttribute('id', 'back');
  $goHome.classList.add('but');
  $goHome.innerHTML = "Home";
  $detail.appendChild($goHome);
  
  var $postTitle = document.createElement("div");
  $postTitle.setAttribute('id', 'detail-title');
  $postTitle.classList.add("detail");
  $postTitle.innerHTML = post.title;
  $detail.appendChild($postTitle);
  
  var $postAuthor = document.createElement("div");
  $postAuthor.setAttribute('id', 'detail-author');
  $postAuthor.classList.add("detail");
  $postAuthor.innerHTML = "By " + post.author;
  $detail.appendChild($postAuthor);
  
  var $postContent = document.createElement("div");
  $postContent.setAttribute('id', 'detail-content');
  //$postContent.classList.add("detail");
  var content = post.content.replace(/&nbsp;/g," ");
  $postContent.innerHTML = content;
  $detail.appendChild($postContent);
  
  // $postContent.innerHTML = post.title + " by " + post.author+"<br>"+post.content;
  
  document.getElementById(pages[2]).classList.remove('hidden');
  document.getElementById("back").addEventListener('click',function(){
    document.getElementById(pages[2]).classList.add('hidden');
    displayHome();
  });
}

var displayNewPost = function() {
  document.getElementById(pages[0]).classList.add('hidden');
  document.getElementById(pages[1]).classList.remove('hidden');
}

var submit = function() {
  
  var title = document.getElementById("title").value;
  var content = document.getElementById("content").value;
  
  var content = content.replace(/ /g,"&nbsp;");
  var content = content.replace(/(?:\r\n|\r|\n)/g, '<br>');

  var author = document.getElementById("author").value;
  posts.push(new Post(title, content, author));
  savePosts();
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  document.getElementById("author").value = "";
  displayHome();
}


// document.addEventListener('click', showNextPage);
// showNextPage();


//console.log(document.getElementById("new-post"));

var checkValid = function() {
  var valid = true;
  var title = document.getElementById("title");
  var author = document.getElementById("author");
  
  if(title.value.length==0){
    title.classList.add('error');
    valid = false;
  }else{
    title.classList.remove('error');
  }
  if(author.value.length==0){
    author.classList.add('error');
    valid = false;
  }else{
    author.classList.remove('error');
  }

  return valid;
}


var init = function() {
  displayHome();
  
  document.getElementById("cancel").addEventListener('click',function(){
    document.getElementById(pages[1]).classList.add('hidden');
    displayHome();
  });
  document.getElementById("submit").addEventListener('click',function(){
    
    
    if(checkValid()){
      document.getElementById(pages[1]).classList.add('hidden');
      submit();
    }
      
  });
  
}

init();