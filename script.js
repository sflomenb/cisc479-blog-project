

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

var valid=true;

var displayHome = function(bool) {
  
  // posts = JSON.parse(localStorage.getItem("posts")) || posts;
  
  myDBPosts.on("value", function(snapshot) {
  var theData = snapshot.val();
  // console.log(JSON.stringify(theData));
  posts = theData || posts;
  hasVoted = JSON.parse(localStorage.getItem("votes")) || hasVoted;
  // console.log("snapshot",posts);
  if(hasVoted.length == 0) {
    for(var i = 0; i< posts.length; i++) {
      hasVoted[i] = 0;
    }
    localStorage.setItem("votes", JSON.stringify(hasVoted));
  }
  else if(hasVoted.length != posts.length) {
    for(var i = hasVoted.length; i < posts.length; i++) {
      hasVoted.push(0);
    }
    localStorage.setItem("votes", JSON.stringify(hasVoted));
  }
  if(bool){
    handleTitle();
  }else{
    loadHome();
  }
});
  
  
  
}

var loadHome = function() {
  console.log("inside load home");
  document.getElementById(pages[1]).classList.add('hidden');
  document.getElementById(pages[2]).classList.add('hidden');
  var $home = document.getElementById("home");
  var $postList = document.getElementById("post-list");
  
  $postList.innerHTML = "";
  
  if(posts.length > 0) {
    posts.forEach(function(post) {
      
      var $upArrow = document.createElement('div');
      if(hasVoted[posts.indexOf(post)] == 1) {
        $upArrow.classList.add("arrow-up", "upvote");
      }
      else {
        $upArrow.classList.add("arrow-up");
      }
      $upArrow.innerHTML = "^";
      $upArrow.addEventListener('click',function(ev){
        if(hasVoted[posts.indexOf(post)] == 0) {
          hasVoted[posts.indexOf(post)] = 1;
          ev.currentTarget.classList.add("upvote");
          post.score += 1;
        }
        else if(hasVoted[posts.indexOf(post)] == 1) {
          hasVoted[posts.indexOf(post)] = 0;
          ev.currentTarget.classList.remove("upvote");
          post.score -= 1;
        }
        else if(hasVoted[posts.indexOf(post)] == -1) {
          hasVoted[posts.indexOf(post)] = 1;
          ev.currentTarget.classList.remove("upvote");
          post.score += 2;
        }
        saveVotes();
        $score.innerHTML = post.score;
        savePosts();
      });
      
      var $score = document.createElement('div');
      $score.classList.add("score");
      //$score.classList.add("post-left");
      $score.innerHTML = post.score;
      
      var $downArrow = document.createElement('div');
      
      if(hasVoted[posts.indexOf(post)] == -1) {
        $downArrow.classList.add("arrow-down", "downvote");
      }
      else {
        $downArrow.classList.add("arrow-down");
      }
      
      $downArrow.innerHTML = "v";
      $downArrow.addEventListener('click',function(ev){
        if(hasVoted[posts.indexOf(post)] == 0) {
          hasVoted[posts.indexOf(post)] = -1;
          ev.currentTarget.classList.add("downvote");
          post.score -= 1;
        }
        else if(hasVoted[posts.indexOf(post)] == -1) {
          hasVoted[posts.indexOf(post)] = 0;
          ev.currentTarget.classList.remove("downvote");
          post.score += 1;
        }
        else if(hasVoted[posts.indexOf(post)] == 1) {
          hasVoted[posts.indexOf(post)] = -1;
          ev.currentTarget.classList.remove("upvote");
          post.score -= 2;
        }
        saveVotes();
        $score.innerHTML = post.score;
        savePosts();
      });
      
      var $postLeft = document.createElement('div');
      $postLeft.classList.add("post-left");
      $postLeft.appendChild($upArrow);
      $postLeft.appendChild($score);
      $postLeft.appendChild($downArrow);
      
      
      var $showText = document.createElement('a');
      var ref = post.title;
      ref = ref.replace(/ /g, '-');
      ref = ref.toLowerCase();
     
      ref = "#" + ref;
      $showText.setAttribute("href", ref);
      $showText.classList.add("post-text");
      $showText.innerHTML = "<span class='home-post-title'>" + post.title+ "</span>" + "<br><span class='by'>by</span> " + post.author + "<br><br>" + post.content.replace(/<br>/g," ").replace(/&nbsp;/g," ").substring(0,30) + "...";
      $showText.addEventListener('click',function(){
        displayPostDetails(post);
      });
      
      var $showPost = document.createElement('div');
      $showPost.classList.add("post");
      
      $showPost.appendChild($showText);
      $showPost.appendChild($postLeft);
      
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
  document.getElementById(pages[0]).classList.add('hidden');
  var $detail = document.getElementById("post-detail");
  
  $detail.innerHTML = "";
  
  // var $postContent = document.createElement('div');
  // $detail.appendChild($postContent);
  
  // var $but = document.createElement('button');
  // $but.setAttribute('id', 'back');
  // $but.innerHTML = "Home";
  // $detail.appendChild($but);
  
  var $goHome = document.createElement('a');
  $goHome.setAttribute("href", "#home");
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
  $postAuthor.innerHTML = "<span class='by'>by</span> " + post.author;
  $detail.appendChild($postAuthor);
  
  var $postContent = document.createElement("div");
  $postContent.setAttribute('id', 'detail-content');
  //$postContent.classList.add("detail");
  var content = post.content.replace(/&nbsp;/g," ");
  $postContent.innerHTML = content;
  $detail.appendChild($postContent);
  
  var $left = document.createElement("div");
  $left.setAttribute('id', 'left');
  $detail.appendChild($left);
  
  var $right = document.createElement("div");
  $right.setAttribute('id', 'right');
  $detail.appendChild($right);
  
  // $postContent.innerHTML = post.title + " by " + post.author+"<br>"+post.content;
  
  document.getElementById(pages[2]).classList.remove('hidden');
  document.getElementById("back").addEventListener('click',function(){
    document.getElementById(pages[2]).classList.add('hidden');
    displayHome(false);
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
  var content = content.replace(/(?:\r\nr|\n)/g, '<br>');

  var author = document.getElementById("author").value;
  posts.push(new Post(title, content, author));
  savePosts();
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  document.getElementById("author").value = "";
  displayHome(false);
}


// document.addEventListener('click', showNextPage);
// showNextPage();


//console.log(document.getElementById("new-post"));

var checkValid = function() {
  valid = true;
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
  //displayHome(false);
  
  document.getElementById("cancel").addEventListener('click',function(){
    valid=true;
    document.getElementById(pages[1]).classList.add('hidden');
    displayHome(false);
  });
  document.getElementById("submit").addEventListener('click',function(){
    
    
    if(checkValid()){
      document.getElementById(pages[1]).classList.add('hidden');
      submit();
    }
      
  });
  
}


var handleTitle = function(){
  for(var i = 0; i < posts.length; i++) {
        var t = posts[i].title;
        t = t.replace(/ /g, "-");
        t = t.toLowerCase();
        t = "#" + t;
        if(location.hash == t){
          displayPostDetails(posts[i]);
        }
      }
      
}
var handleHash = function(){
  if(!valid){
    location.hash = "new-post";
  }
        //document.body.innerHTML = document.querySelector(location.hash).innerHTML;
        //displayNewPost();
    //displayHome(false);
    
    if(location.hash == "" || location.hash == "#home"){
      displayHome(false);
    }
    else if(location.hash == "#new-post"){
      displayNewPost();
    }else{
      displayHome(true);
      
    }
};
init();
window.addEventListener("hashchange", handleHash);
window.addEventListener("load", handleHash);
