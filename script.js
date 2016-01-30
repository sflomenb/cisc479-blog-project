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

var Post = function(title,content,author){
  this.title = title;
  this.content = content;
  this.author = author;
};


// var currentPageIndex = -1;
// var showNextPage = function(){
//   currentPageIndex = (currentPageIndex + 1) % pages.length;
//   var template = document.getElementById(pages[currentPageIndex]).innerHTML;
//   //do stuff to template here
//   display.innerHTML = template;
// }

var displayHome = function() {
  var template = document.getElementById(pages[0]).innerHTML;
  
  
  if(posts.length > 0) {
    posts.forEach(function(post) {
      var $showPost = document.createElement('div');
      $showPost.classList.add("post");
      $showPost.innerHTML = post.title + " by " + post.author;
      // var myPost = "<div class='post'>" + post.title + " by " + post.author + "</div>";
      // template += myPost;
       template.appendChild($showPost);
      //document.getElementById("home").appendChild($showPost);

     
    });
  }
  else {
    // var $noPosts2 = "<p>No posts yet.</p>"
    // var $noPosts = document.createElement('p');
    // $noPosts.innerHTML = "No posts yet, write one!";
    // var body = document.getElementById("home").innerHTML;
    // body += $noPosts2;
  }
  // display.innerHTML = template;
  display.appendChild(template);
  document.getElementById("plus").addEventListener('click',newPost);
  // document.getElementsByClassName("post").addEventListener('click', postDetails);
}

var postDetails = function() {
  var template = document.getElementById(pages[2]).innerHTML;
  display.innerHTML = template;
  document.getElementById("back").addEventListener('click',displayHome);
}

var newPost = function() {
  var template = document.getElementById(pages[1]).innerHTML;
  display.innerHTML = template;
  document.getElementById("cancel").addEventListener('click',displayHome);
  document.getElementById("submit").addEventListener('click',addPost);
  
  
}

var addPost = function() {
  
  var title = document.getElementById("title").value;
  var content = document.getElementById("content").value;
  var author = document.getElementById("author").value;
  posts.push(new Post(title, content, author));
  displayHome();
}


// document.addEventListener('click', showNextPage);
// showNextPage();

displayHome();
//console.log(document.getElementById("plus"));
