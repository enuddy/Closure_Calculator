/**
 * Created by Evan_Nudd on 3/17/16.
 */
function addTable(data) {
    // access table area location
    var $loc = $("#calculations_wrapper");

    // create a table wrapper to contain the datatable
    var $table_wrapper = $("<div class='table_wrapper' ></div>");
    var $table_container = $("<table class='display'></table>")
    $table_container.attr('id', 'table_' + data[0].length);
    var table = $table_container.DataTable({
        select: true,
        columns: [
            {
                className:      'details-control',
                title:          "left"
            },
            {  title: "right" }
        ]
    });

    for (var dat in data) {
        table.row.add([data[dat], getDependant(data[dat])]).draw(false);
    }

    $table_wrapper.append($table_container);

    $loc.append($table_wrapper);
}

function addDep() {
    var $loc = $("#dependents");
    var $dep_container = $("<div class='dep_container'></div>")
    var $arrow = $("<div class='arrow'>--></div>");

    var $lhs_input = $("<div class='lhs_input'></div>");
    var $rhs_input = $("<div class='rhs_input'></div>");

    $lhs_input.append("<input class='dep_l_input' type='text'>");
    $rhs_input.append("<input class='dep_r_input' type='text'>");

    $dep_container.append($lhs_input);
    $dep_container.append($arrow);
    $dep_container.append($rhs_input);

    $loc.append($dep_container);
}