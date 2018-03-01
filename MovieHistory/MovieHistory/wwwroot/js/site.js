
﻿$("#movieGrid").on("click", evt => {
    const apiId = evt.target.parentElement.id.split("--")[1]
    const movie = MovieStore.movies.find(m => parseInt(apiId) === m.id)

    window.location = `/Movie/Track/?apiId=${movie.id}&title=${movie.title}&img=${movie.poster_path}`
})

﻿$("#trackedMovieGrid").on("click", evt => {

     var idSplit = evt.target.id.split("--")

     if (idSplit[0] == "movieFavoriteButton")
     {
         $(`#${evt.target.id}`).toggleClass("favoriteMovieButton-true")

         $.ajax({
             method: "POST",
             url: `../MovieUser/Favorite/${idSplit[1]}`,
             success: console.log("horray")
         })
     }

     if (idSplit[0] == "movieWatchButton") {
         $(`#${evt.target.id}`).toggleClass("watchedMovieButton-true")

         $.ajax({
             method: "POST",
             url: `../MovieUser/Watch/${idSplit[1]}`,
             success: console.log("horray")
         })
     }

})


$("#movieSearch__button").click(evt => {
    const userSearchString = $("#movieSearch").val()

    $.ajax({
        method: "GET",
        url: `https://api.themoviedb.org/3/search/movie?api_key=${moviedb.key}&language=en-US&query=${userSearchString}&page=1&include_adult=false`
    }).then(res => {
        MovieStore.movies = res.results
        let titles = "<div class='row'>"
        res.results.forEach((m, idx) => {

            titles += `
                <div class="col-md-3 movieGrid__movie" id="movie--${m.id}">
                    <h2 class="fakeLink">${m.title}</h2>
                    <img class="fakeLink" src="https://image.tmdb.org/t/p/w154${m.poster_path}" />
                </div>
            `
            if ((idx + 1) % 4 === 0) {
                titles += "</div><div class='row'>"
            }
        })

        titles += "</div>"

        $("#movieGrid").html(titles)
    })
});