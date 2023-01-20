// Code copied from the interwebs for fuzzy string searching

// turn a string into n 'grams'. we also lowercase the grams.
String.prototype.ngrams = function (n: number) {
  var r = [];

  for (var j = 1; j <= n; j++) {
    for (var i = 0; i <= this.toLowerCase().length - j; i++) {
      r.push(this.toLowerCase().substring(i, i + j));
    }
  }

  return r;
};

function intersect(array1: [], array2: []) {
  return array1.filter((value) => array2.includes(value));
}

export const filterOptions = (options: any[], state: { inputValue: any }) => {
  const { inputValue } = state;
  if (!inputValue) {
    return options.slice(0, 25);
  }
  const inputTrigrams = inputValue.ngrams(3);
  return (
    options
      // iterate over each option and compute intersect(ngram(search), all_color_ngrams)
      .map((option) => {
        const nMatches = intersect(
          inputTrigrams, // ngrams of search input (i.e. "crnflower")
          option.name.ngrams(3) // ngrams of the option (i.e. "cornflowerblue")
        ).length;
        return {
          ...option,
          nMatches,
        };
      })
      // toss out anything that had no matches
      .filter(({ nMatches }) => nMatches > 0)
      // for sanity's sake we'll only display the top 10 results. we're going to
      // order by `nMatches`. in the event of a tie the shorter word wins.
      //
      // i.e. if we're searching for "blue" then "Blue" is #1 and "Green Blue" #2
      .sort((a, b) => {
        const diff = b.nMatches - a.nMatches;
        if (diff) {
          return diff;
        }
        // if they have the same number off matching trigrams, shorter one wins
        return a.name.length - b.name.length;
      })
      // return the top 25
      .slice(0, 25)
  );
};
