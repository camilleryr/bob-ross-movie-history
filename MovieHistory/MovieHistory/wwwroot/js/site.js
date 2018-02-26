// Write your JavaScript code.

$("#movieSearch__button").click(evt => {
    const userSearchString = $("#movieSearch").val()

    $.ajax({
        method: "GET",
        url: `https://api.themoviedb.org/3/search/movie?api_key=0816e8438e2384e0b8907a88cda3ee2b&language=en-US&query=${userSearchString}&page=1&include_adult=false`,
    }).then(response => console.log(response))
});
