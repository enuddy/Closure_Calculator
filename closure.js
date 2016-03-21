/**
 * Created by Evan_Nudd on 3/14/16.
 */

var FuncDep = function(lhs, rhs){
    this.lhs = lhs;
    this.rhs = rhs;
};
FuncDep.prototype.toString = function() {   // Called by the toString() in the join() method used in domManip
    return " " + this.lhs + " -> " + this.rhs;
}

function run() {
    // collect the init array that was input.
    var init_val = $('.init_set_text').val();
    var init_set = init_val.split(' ');

    // make all tables
    for (var i = 1; i<= init_set.length; i++) {
        var combo = makeCombinations(init_set, i);
        console.log(combo);
        addTable(combo);
    }
}


var makeCombinations = function (a, size) {
    if (size > a.length) return [];

    var fn = function(n, src, got, all) {
        if (n==0) {
            if (got.length > 0){
                all[all.length] = got;
            }
            return;
        }
        for (var j = 0; j < src.length; j++) {
            fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
    }

    var all = [];
    fn (size, a, [], all);
    return all;
}

var setInArray = function (subset, parentset) {

    for (var i = 0; i < subset.length; i++) {
        if ($.inArray(subset[i], parentset) == -1) // does not exist in set
            return false;
    }

    return true;
}

/* TODO rename this
* This will get all the results for any given subset possible*/
var getDependant = function(subset, fds_applied) {
    var dependants = subset.slice(0);
    var collection = $(".dep_l_input");

    do
    {
        var size = dependants.length;

        collection.each(function(index, value) {

            // Get the dependencies as an array
            var arr = $(this).val().split(' ');

            // See if a dependency exists.
            if (setInArray(arr, dependants)) {
                // if it exists, add the rhs rule
                var rhs_arr = $('.dep_r_input').eq(index).val().split(' ');

                if (mergeSet(rhs_arr, dependants)) {
                    fds_applied.push(new FuncDep(arr, rhs_arr))
                }
            }
        });
    } while (size != dependants.length);

    return dependants;
}

/* Merges the child_set into the parent_set ( not allowing duplicates ) */
var mergeSet = function (child_set, parent_set) {
    for (var i = 0; i < child_set.length; i++) {
        if ($.inArray(child_set[i], parent_set) == -1) {
            parent_set.push(child_set[i]);
        }
        else
            return false;
    }

    return true;
}