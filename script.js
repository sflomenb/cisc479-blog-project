// var init = function() {
//     var $home = document.createElement('div');
//     $home.setAttribute("id", 'home');
//     document.body.appendChild($home);
//     $home.innerHTML = "home";
    
  
//     var $newPost = document.createElement('div');
//     $newPost.setAttribute("id", 'new-post');
//     $newPost.classList.add("hidden");
//     document.body.appendChild($newPost);
//     $newPost.innerHTML = "new post";
    
//     var $postDetail = document.createElement('div');
//     $postDetail.setAttribute("id", 'post-detail');
//     $postDetail.classList.add("hidden");
//     document.body.appendChild($postDetail);
//     $postDetail.innerHTML = "post detail";
// }

// init();

var pages = ['home', 'new-post', 'post-detail'];

var posts = [];

var savePosts = function() {
  localStorage.setItem("posts", JSON.stringify(posts));
};



var Post = function(title,content,author){
  this.title = title;
  this.content = content;
  this.author = author;
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
  
  posts = JSON.parse(localStorage.getItem("posts")) || posts;
  
  var $home = document.getElementById("home");
  
  $home.innerHTML = "";
        
  var $homeHeader = document.createElement('h1');
  $homeHeader.setAttribute('id', 'home-header');
  $homeHeader.innerHTML = "Home";
  $home.appendChild($homeHeader);
  
  var $but = document.createElement('button');
  $but.setAttribute('id', 'plus');
  $but.innerHTML = "+";
  $home.appendChild($but);
  
  
  if(posts.length > 0) {
    posts.forEach(function(post) {
      var $showPost = document.createElement('div');
      $showPost.classList.add("post");
      $showPost.innerHTML = post.title + " by " + post.author;
      $showPost.addEventListener('click',function(){
        postDetails(post);
      });
      $home.appendChild($showPost);
     
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
  document.getElementById("plus").addEventListener('click',newPost);
  // document.getElementsByClassName("post").addEventListener('click', postDetails);
}

var postDetails = function(post) {
  document.getElementById(pages[0]).classList.add('hidden');
  
  var $detail = document.getElementById("post-detail");
  
  $detail.innerHTML = "";
  
  
  
  var $postContent = document.createElement('div');
  $postContent.innerHTML = post.title + " by " + post.author+"<br>"+post.content;
  $detail.appendChild($postContent);
  
  var $but = document.createElement('button');
  $but.setAttribute('id', 'back');
  $but.innerHTML = "back";
  $detail.appendChild($but);
  
  document.getElementById(pages[2]).classList.remove('hidden');
  document.getElementById("back").addEventListener('click',function(){
    document.getElementById(pages[2]).classList.add('hidden');
    displayHome();
  });
}

var newPost = function() {
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


//console.log(document.getElementById("plus"));


var init = function() {
  displayHome();
  
  document.getElementById("cancel").addEventListener('click',function(){
    document.getElementById(pages[1]).classList.add('hidden');
    displayHome();
  });
  document.getElementById("submit").addEventListener('click',function(){
    
    document.getElementById(pages[1]).classList.add('hidden');
    submit();
  });
  
}

init();