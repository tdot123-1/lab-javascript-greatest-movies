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
    // could use some rework, check for errors etc

    // assuming all duration properties have the same format, split on space for h and m
    const newArr = moviesArray.map(movie => {
        const timeArr = movie.duration.split(" ");
        let totalMin = 0;
        // if resulting array is length 2: the movie has both hours and minutes
        if (timeArr.length === 2) {
            const minStr = timeArr[1].slice(0, timeArr[1].indexOf("m"));
            const minInt = parseInt(minStr);
            totalMin += minInt;
        }
        const hoursStr = timeArr[0].slice(0, timeArr[0].indexOf("h"));
        const hoursInt = parseInt(hoursStr);
        totalMin += (hoursInt * 60);
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
    

    // try to optimize, remove unnecessary steps, repeated lines
    
    if (moviesArray.length === 0) {
        return null;
    }
    
    const bestAvg = {
        "year": null,
        "average": 0,
    };

    // get array ofall unique years 
    const yearsArr = moviesArray.map(movie => movie.year)
                    .filter((year, index, arr) => (arr.indexOf(year) === index));
    
    // get array of all sums by year
    const sumsArr = yearsArr.map((year) => {
        const totalScore =  moviesArray.filter(movie => (movie.year === year))
                            .reduce((acc, movie) => acc + movie.score, 0);
        const totalMovies = moviesArray.filter(movie => (movie.year === year)) // !repeated line 
                            .reduce((acc, movie) => acc + 1, 0);
        return {
            "year": year,
            "totalScore": totalScore,
            "totalMovies": totalMovies,
        }
    });

    // get array for average scores per year (maybe can be included in previous map)
    const avgArr = sumsArr.map(year => {
        return {
            "year": year.year,
            "average": year.totalScore / year.totalMovies,
        };
    });

    // find highest average
    avgArr.forEach(item => {
        if (item.average > bestAvg.average) {
            bestAvg.year = item.year;
            bestAvg.average = item.average;
        }
        else if (item.average === bestAvg.average && item.year < bestAvg.year) {
            bestAvg.year = item.year;
            bestAvg.average = item.average;
        } 
    });

    
    return `The best year was ${bestAvg.year} with an average score of ${bestAvg.average}`
}
