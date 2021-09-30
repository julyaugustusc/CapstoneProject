function isEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

$(function () {
    let select = {
        database: $('#database'),
        measurement: $('#measurement'),
        tagName: $('#tagName'),
        tagValue: $('#tagValue'),
        field: $('#field'),
        fieldFunction: $('#fieldFunction'),
        groupBy: $('#groupBy'),
        type: $('#type'),
        absoluteGroup: $('#absolute'),
        relativeGroup: $('#relative')
    }

    function updateMeasurements() {
        let database = select.database.val();
        select.measurement.attr('disabled', 'disabled');

        if (database.length) {
            $.getJSON($DATABASE_GET_MEASUREMENTS_URL, {database: database}, function (data) {
                select.measurement.empty();
                if (!isEmpty(data)) {
                    select.measurement.append(
                        $('<option selected disabled hidden>', {
                            value: 'NA',
                            text: ''
                        })
                    );
                    Object.keys(data).forEach(function (data2) {
                        select.measurement.append(
                            $('<option>', {
                                value: data2,
                                text: data2
                            })
                        );
                    });
                    select.measurement.removeAttr('disabled');
                } else {
                    select.measurement.append(
                        $('<option>', {
                            value: "NA",
                            text: "No measurements found"
                        })
                    );
                }
            });
        }
    }

    function updateFields() {
        let database = select.database.val();
        let measurement = select.measurement.val();
        select.field.attr('disabled', 'disabled');

        if (database.length && measurement.length) {
            $.getJSON($DATABASE_GET_FIELDS_URL, {
                database: database,
                measurement: measurement
            }, function (data) {
                select.field.empty();
                if (!isEmpty(data)) {
                    select.field.append(
                        $('<option selected disabled hidden>', {
                            value: 'NA',
                            text: ''
                        })
                    );
                    Object.keys(data).forEach(function (data2) {
                        select.field.append(
                            $('<option>', {
                                value: data2,
                                text: data2
                            })
                        );
                    });
                    select.field.removeAttr('disabled');
                } else {
                    select.field.append(
                        $('<option>', {
                            value: "NA",
                            text: "No fields found"
                        })
                    );
                }
            });
        }
    }

    function updateTagNames() {
        let database = select.database.val();
        let measurement = select.measurement.val();
        select.tagName.attr('disabled', 'disabled');

        if (database.length && measurement.length) {
            $.getJSON($DATABASE_GET_TAG_NAMES_URL, {
                database: database,
                measurement: measurement
            }, function (data) {
                select.tagName.empty();
                if (!isEmpty(data)) {
                    select.tagName.append(
                        $('<option selected disabled hidden>', {
                            value: 'NA',
                            text: ''
                        })
                    );
                    Object.keys(data).forEach(function (data2) {
                        select.tagName.append(
                            $('<option>', {
                                value: data2,
                                text: data2
                            })
                        );
                    });
                    select.tagName.removeAttr('disabled');
                } else {
                    select.tagName.append(
                        $('<option>', {
                            value: "NA",
                            text: "No tag names found"
                        })
                    );
                }
            });
        }
    }

    function updateTagValues() {
        let database = select.database.val();
        let measurement = select.measurement.val();
        let tagName = select.tagName.val();
        select.tagValue.attr('disabled', 'disabled');

        if (database.length && measurement.length && tagName.length) {
            $.getJSON($DATABASE_GET_TAG_VALUES_URL, {
                database: database,
                measurement: measurement,
                tagName: tagName
            }, function (data) {
                select.tagValue.empty();
                if (!isEmpty(data)) {
                    select.tagValue.append(
                        $('<option selected disabled hidden>', {
                            value: 'NA',
                            text: ''
                        })
                    );
                    Object.keys(data).forEach(function (data2) {
                        select.tagValue.append(
                            $('<option>', {
                                value: data2,
                                text: data2
                            })
                        );
                    });
                    select.tagValue.removeAttr('disabled');
                } else {
                    select.tagValue.append(
                        $('<option>', {
                            value: "NA",
                            text: "No tag values found"
                        })
                    );
                }
            });
        }
    }

    select.database.on('change', function () {
        updateMeasurements();
    });

    select.measurement.on('change', function () {
        updateTagNames();
        updateFields();
    });

    select.tagName.on('change', function () {
        updateTagValues();
    });

    select.fieldFunction.on('change', function () {
        if(select.fieldFunction.val() !== '') {
            select.groupBy.removeAttr('disabled');
        } else {
            select.groupBy.attr('disabled', 'disabled');
        }
    });

    select.type.on('change', function() {
        if(select.type.prop('checked')) {
            select.absoluteGroup.show();
            select.relativeGroup.hide();
        } else {
            select.absoluteGroup.hide();
            select.relativeGroup.show();
        }
    });

    select.relativeGroup.hide();
});