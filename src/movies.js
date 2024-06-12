// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    const directorsArr = moviesArray.map(movie =>  movie.director);
    return directorsArr;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    const amount = moviesArray.filter(movie => 
        (movie.director === "Steven Spielberg" && movie.genre.includes("Drama")))
        .reduce((acc) => acc + 1, 0);
    return amount;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if (moviesArray.length === 0) {
        return 0;
    }
    const sum = moviesArray.reduce((acc, movie) => {
        if (!movie.score) {
            return acc;
        }
        else {
            return acc + movie.score;
        }
    }, 0);

    return Math.round((sum / moviesArray.length) * 100) / 100;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {

    // get seperate array for drama movies (because length is needed later)
    const dramaMovies = moviesArray.filter(movie => movie.genre.includes("Drama"))
    if (dramaMovies.length === 0) {
        return 0;
    }
    // get sum of scores
    const sum = dramaMovies.reduce((acc, movie) => acc + movie.score, 0);

    return Math.round((sum / dramaMovies.length) * 100) / 100;
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {

    // if years are equal, sort my title
    const orderedArr = moviesArray.toSorted((a, b) => {
       if (a.year === b.year) {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
       }
       return a.year - b.year;
    });

    return orderedArr;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    // sort by title, filter to only have array until 19th index
    const orderedArr = moviesArray.toSorted((a, b) => 
                        a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
                        .map(movie => movie.title)
                        .filter((movie, movieIndex) => movieIndex < 20);

    return orderedArr;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    // UPDATED

    // assuming all duration properties have the same format,
    const newArr = moviesArray.map(movie => {
        let totalMin = 0;
        // check if duration is at least 1 hour
        if (movie.duration.includes("h")) {
            // parse int from substring from start to "h" char
            totalMin += parseInt(
                movie.duration.slice(0, movie.duration.indexOf("h"))
            ) * 60;
        }
        // check if movie has additional minutes
        if (movie.duration.includes("m")) {
            // parse int from substring from " " separation with hours to "m" char
            totalMin += parseInt(
                movie.duration.slice(movie.duration.indexOf(" "), movie.duration.indexOf("m"))
            );
        }
        // update duration for new array
        return {
            "title": movie.title,
            "year": movie.year,
            "director": movie.director,
            "duration": totalMin,
            "genre": movie.genre,
            "score": movie.score,
        }
    });

    return newArr;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    // UPDATED

    // check for empty array
    if (moviesArray.length === 0) {
        return null;
    }
    // set object to save best avg
    const bestAvg = {
        "year": null,
        "average": 0,
    };

    // get array of all unique years 
    const yearsArr = moviesArray.map(movie => movie.year)
                    .filter((year, index, arr) => (arr.indexOf(year) === index));
    
    // get array of all average scores by year
    const averagesArr = yearsArr.map((year) => {
        // use reduce to get both total score and total movies filtered by year
        const {totalScore, totalMovies } =  moviesArray.filter(movie => (movie.year === year))
                            .reduce((acc, movie) => {
                                acc.totalScore += movie.score;
                                acc.totalMovies += 1;
                                return acc;
                            }, {"totalScore": 0, "totalMovies": 0});
        
        // calculate average for year, store in object, add to array
        const averageScore = totalScore / totalMovies;
        return {
            "year": year,
            "average": averageScore,
        };
    });

    
    // find highest average
    averagesArr.forEach(year => {
        if (year.average > bestAvg.average) {
            bestAvg.year = year.year;
            bestAvg.average = year.average;
        }
        // if average is equal, compare years
        else if (year.average === bestAvg.average && year.year < bestAvg.year) {
            bestAvg.year = year.year;
            bestAvg.average = year.average;
        } 
    });

    
    return `The best year was ${bestAvg.year} with an average score of ${bestAvg.average}`
}
