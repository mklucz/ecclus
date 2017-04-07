/**
* The mapping will consist of key:object pairs, instead of simple
* key:string.
* 
* What I'll eventually need to include in the object:
* 
* > The abbreviation (if there's more than one in common use I'll simply
* duplicate entries, should be faster than using as keys arrays holding 
* all possible abbreviations and going through the array every time.
* 
* > An array holding the possible names the book (Song of Songs, Song of
* Salomon etc.)
* 
* > A mapping of num_of_chapter:num_of_verses_in_it and perhaps the 
* num_of_chapters in a separate variable, so I don't have to do .length
* every time.
* 
* > HOW TO MAKE A LINK
* 
* > Is the book apocryphal according to major denominations
*
*/
var books = new Map(
[['Rdz', 'Rdz'], ['Wj', 'Wj'], ['Lb', 'Lb'], ['Pwt', 'Pwt'],
['Joz', 'Joz'], ['Sdz', 'Sdz'], ['Rt', 'Rt'], ['1 Sm', '1 Sm'],
['2 Sm', '2 Sm'], ['1 Krl', '1 Krl'], ['2 Krl', '2 Krl'],
['1 Krn', '1 Krn'], ['2 Krn', '2 Krn'], ['Ezd', 'Ezd'],
['Ne', 'Ne'], ['Tb', 'Tb'], ['Jdt', 'Jdt'], ['Est', 'Est'],
['1 Mch', '1 Mch'], ['2 Mch', '2 Mch'], ['Hi', 'Hi'], ['Ps', 'Ps'],
['Prz', 'Prz'], ['Koh', 'Koh'], ['Pnp', 'Pnp'], ['Mdr', 'Mdr'],
['Syr', 'Syr'], ['Iz', 'Iz'], ['Jr', 'Jr'], ['Lm', 'Lm'],
['Ba', 'Ba'], ['Ez', 'Ez'], ['Dn', 'Dn'], ['Oz', 'Oz'],
['Jl', 'Jl'], ['Am', 'Am'], ['Ab', 'Ab'], ['Jon', 'Jon'],
['Mi', 'Mi'], ['Na', 'Na'], ['Ha', 'Ha'], ['So', 'So'],
['Ag', 'Ag'], ['Za', 'Za'], ['Ml', 'Ml'], ['Mt', 'Mt'],
['Mk', 'Mk'], ['J', 'J'], ['Dz', 'Dz'], ['Rz', 'Rz'],
['1 Kor', '1 Kor'], ['2 Kor', '2 Kor'], ['Ga', 'Ga'],
['Ef', 'Ef'], ['Flp', 'Flp'], ['Kol', 'Kol'],
['1 Tes', '1 Tes'], ['2 Tes', '2 Tes'], ['1 Tm', '1 Tm'],
['2 Tm', '2 Tm'], ['Tt', 'Tt'], ['Flm', 'Flm'],
['Hbr', 'Hbr'], ['Jk', 'Jk'], ['1 P', '1 P'],
['2 P', '2 P'], ['1 J', '1 J'], ['Ap', 'Ap'],
['2 J', '2 J'], ['3 J', '3 J'], ['Jud', 'Jud']]
);
