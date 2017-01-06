// Interview questions
// Use real arrays; make sure run in O(n)

// 1) Imagine you have an array of numbers. Write an
// algorithm to remove all numbers less than five from the array.
// You shouldn't use the .filter method here; try to write the algorithm from scratch. (Edit in place)

let arr = [6,2,5,4,5,6,7,8,9];

var delLessThanFive = function (arr) {
  arr.sort();
  let i = 0;
  while (arr[i] < 5) {
      arr.shift(i);
    }
  return arr;
}

delLessThanFive(arr);

console.log(arr);

//
//
// 2) Imagine you have two arrays which have already been sorted.
// Write an algorithm to merge the two arrays into a single array,
// which should also be sorted. For example, if your input arrays
// were [1, 3, 6, 8, 11] and [2, 3, 5, 8, 9, 10], your output array
// should be [1, 2, 3, 3, 5, 6, 8, 8, 9, 10, 11].
//
let arr1 = [1, 3, 6, 8, 11];
let arr2 = [2, 3, 5, 8, 9, 10];
let arr3 = [];

let mergeAndSort = (arr1, arr2) => {
  //if the first arr1 element is <  the first arr2 element,
  //put it in arr3
  //if not, put arr2 element in arr3
  //then go to the next element in the arr where the element
  //was removed
  //repeat until the end of either array, and then
  //push the remaining items
  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      arr3.push(arr1[i]);
      i++;
    }
    else {
      arr3.push(arr2[j]);
      j++;
    };
  }
  return arr3.concat(arr1.slice[i], arr2.slice[j]);
}
mergeAndSort(arr1, arr2)
console.log(arr3);

  //
  // arr3.sort();


//
// 3) Given an array of numbers, write an algorithm to find out
// the products of every number, except the one at that index. For
// example, if the input was [1, 3, 9, 4], the output should be
// [108, 36, 12, 27] (i.e. [3*9*4, 1*9*4, 1*3*4, 1*3*9]).
//

//take the index and multiply the other numbers to each other
//then take the second index and multiply the other numbers
//to each other
//and so on until the end of the array

let multiplyAllButIndex = (arr) => {
    let newArr = [];
    for (i = 0; i < arr.length; i++) {
    let product = 1;
    for(j = 0; j < arr.length; j++) {
      if (i != j) {
        product *= arr[j];
      }
    }
    newArr.push(product);
  }
  return newArr;
}

console.log(multiplyAllButIndex([2,4,6]));

//
