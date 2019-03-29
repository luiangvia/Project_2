(function ($) {
    'use strict';

    if ($.fn.owlCarousel) {
        // :: 1.0 Welcome Post Slider Active Code
        $(".welcome-post-sliders").owlCarousel({
            items: 4,
            loop: true,
            autoplay: true,
            smartSpeed: 1500,
            margin: 10,
            nav: true,
            navText: ['', ''],
            responsive: {
                320: {
                    items: 1
                },
                576: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        })
        // :: 2.0 Instagram Slider Active Code
        $(".instargram_area").owlCarousel({
            items: 6,
            loop: true,
            autoplay: true,
            smartSpeed: 800,
            nav: true,
            navText: ['', ''],
            responsive: {
                320: {
                    items: 1
                },
                480: {
                    items: 2
                },
                576: {
                    items: 3
                },
                768: {
                    items: 4
                },
                992: {
                    items: 5
                },
                1200: {
                    items: 6
                }
            }
        })
        // :: 3.0 Related Post Slider Active Code
        $(".related-post-slider").owlCarousel({
            items: 3,
            loop: true,
            autoplay: true,
            smartSpeed: 800,
            nav: true,
            margin: 30,
            navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
            responsive: {
                320: {
                    items: 1
                },
                480: {
                    items: 2
                },
                768: {
                    items: 3
                }
            }
        })
    }

    // :: 4.0 ScrollUp Active JS
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 1500,
            scrollText: '<i class="fa fa-arrow-up" aria-hidden="true"></i>'
        });
    }

    // :: 5.0 CounterUp Active JS
    if ($.fn.counterUp) {
        $('.counter').counterUp({
            delay: 10,
            time: 2000
        });
    }

    // :: 6.0 PreventDefault a Click
    $("a[href='#']").on('click', function ($) {
        $.preventDefault();
    });

    // :: 7.0 Search Form Active Code
    $(".searchBtn").on('click', function () {
        $(".search-hidden-form").toggleClass("search-form-open");
    });

    // :: 8.0 Search Form Active Code
    $("#pattern-switcher").on('click', function () {
        $("body").toggleClass("bg-pattern");
    });
    $("#patter-close").on('click', function () {
        $(this).hide("slow");
        $("#pattern-switcher").addClass("pattern-remove");
    });

    // :: 9.0 wow Active Code
    if ($.fn.init) {
        new WOW().init();
    }

    // :: 10.0 matchHeight Active JS
    if ($.fn.matchHeight) {
        $('.item').matchHeight();
    }

    var $window = $(window);

    // :: 11.0 Preloader active code
    $window.on('load', function () {
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

    // Title slideshow on home page
    $("#slideshow > div:gt(0)").hide();
    setInterval(function () {
        $('#slideshow > div:first')
            .fadeOut(1000)
            .next()
            .fadeIn(1000)
            .end()
            .appendTo('#slideshow');
    }, 3000);

    // Food news API call displayed in sidebar.
    $(document).ready(function()  {
        var newsapi = '7fabcb6f2bdc479e826d08269c5e8647';
        var news_resource_url = 'https://newsapi.org/v2/everything?q=food&apiKey=' + newsapi;
        $.ajax({
            url: news_resource_url,
            method: "GET"
        }).then(function (response) {

            for (var i = 0; i < 5; i++) {
                var newCard = $("<div>").attr("class", "single-populer-post d-flex");
                var newCardImg = $("<img>").attr("src", response.articles[i].urlToImage);
                var newCardContent = $("<div>").attr("class", "post-content");
                var newCardTitle = $("<h6>");
                var newCardBtn = $("<a>").attr("class", "read-more");

                newCardTitle.text(response.articles[i].title);
                newCardBtn.text("Read more...");
                newCardBtn.attr("href", response.articles[i].url);
                newCardContent.append(newCardTitle, newCardBtn)
                newCard.append(newCardImg, newCardContent);
                var card = $("#news");
                //append my new row to the table body
                card.append(newCard);
            }
        })
    });

})(jQuery);


//============================ Search Button Api Results==================================================================//

// Initial array of recipes
//var recipes[];

var id = "cb29f88c";
var key = "d602f1e3d5650efe09b61a38753a9132";

$("#submit").on("click", function (event) {
    event.preventDefault();

    $("recipes-view").empty();
   
    var recipe = $("#recipes").val().trim();
    //var recipe = $(this).attr("data-name");
    console.log(recipe);
    var queryURL = "https://api.edamam.com/search?q=" + recipe + "&app_id=" + id + "&app_key=" + key ;
  
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 1; i++) {
            var recipeDiv = $("<div class='recipe'>");
            var recipeName = response.hits[i].recipe.label;
            var pOne = $("<p>").text("Name: " + recipeName);
            recipeDiv.append(pOne);
            var calories = response.hits[i].recipe.calories;
            var pTwo = $("<p>").text("Calories: " + calories);
            recipeDiv.append(pTwo);
            var ingredients = response.hits[i].recipe.ingredientLines;
            var pThree = $("<p>").text("Ingredients: " + ingredients);
            recipeDiv.append(pThree);
            var imgURL = response.hits[i].recipe.image;
            var image = $("<img>").attr("src", imgURL);
            recipeDiv.append(image);
            var ingredients = response.hits[i].recipe.ingredientLines;
            var pThree = $("<p>").text("Ingredients: " + ingredients);
            recipeDiv.append(pThree);
            var link = $("<a>");
            link.text("More info");
            sourceLink = response.hits[i].recipe.url;
            link.attr("href", sourceLink);
            link.attr("target", "_blank");
            recipeDiv.append(link);

            $("#recipes-view").prepend(recipeDiv);
        };
    });
}



/*
function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < recipes.length; i++) {

        var a = $("<button>");
        a.addClass("recipe-btn");
        a.attr("data-name", recipes[i]);
        a.text(recipes[i]);
        $("#buttons-view").append(a);
    }
}

$("#submit").on("click", function (event) {
    event.preventDefault();
    var recipe = $("#recipe-input").val().trim();
    recipes.push(recipe);
    renderButtons();
});
$(document).on("click", ".recipe-btn", displayRecipeInfo);
renderButtons();
*/
)