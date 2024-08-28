const deActivateCharity = (element)=>{
    $.ajax({
        type: 'GET',
        url: `/deactivate-charity/${jQuery(element).data('id')}`,
        success: function(response) {
            if(response.success){
                location.reload();
            }
        }
      });
}
const ActivateCharity = (element)=>{
    $.ajax({
        type: 'GET',
        url: `/activate-charity/${jQuery(element).data('id')}`,
        success: function(response) {
            if(response.success){
                location.reload();
            }
        }
      });
}
function previewImage(event) {
    var reader = new FileReader();
    reader.onload = function() {
        var output = document.getElementById('imagePreview');
        output.src = reader.result;
        output.style.display = 'block';
    }
    reader.readAsDataURL(event.target.files[0]);
}
jQuery(document).ready(()=>{
    jQuery("#basicForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            description: {
                required: true,
                minlength: 5
            },
            // image: {
            //     required: true
            // }
        },
        messages: {
            name: {
                required: "Please enter a name",
                minlength: "Name must be at least 3 characters long"
            },
            description: {
                required: "Please provide a description",
                minlength: "Description must be at least 5 characters long"
            },
            // image: {
            //     required: "Please upload an image"
            // }
        },
        submitHandler: function(form) {
            var formData = new FormData(form);
            jQuery.ajax({
                url: '/categories/update/',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    if(response.status == 'success'){
                       location.reload();
                    }
                },
                error: function(error) {
                    alert('There was an error submitting the form');
                }
            });
        }
    });

    //get city on the basis of city selection

    jQuery('#state').change(()=>{
        jQuery.ajax({
            url: `/city/${jQuery('#state').val()}`,
            type: 'GET',
            success: function(response) {
             let option = '';
             response.city.forEach(element => {
                option += `<option value=${element._id}>${element.name}</option>`;
             });
              jQuery('#city').empty().html(option);
            },
            error: function(error) {
                alert('There was an error submitting the form');
            }
        });
    })

    //Edit Charity Validation

    $("#editcharity").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            ngoid:{
                required: true
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 10
            },
            state: {
                required: true
            },
            city: {
                required: true
            },
            pincode: {
                required: true,
                digits: true,
                minlength: 6,
                maxlength: 6
            },
            goal: {
                required: true,
                digits: true
            },
            description: {
                required: true,
                minlength: 10
            },
            image: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Please enter the NGO name",
                minlength: "NGO name must be at least 2 characters long"
            },
            ngoid:{
                required: "Please enter the Ngo Government ID",
            },
            email: {
                required: "Please enter a valid email address",
                email: "Please enter a valid email address"
            },
            phone: {
                required: "Please enter a valid phone number",
                digits: "Please enter only digits",
                minlength: "Phone number must be 10 digits long",
                maxlength: "Phone number must be 10 digits long"
            },
            state: {
                required: "Please select a state"
            },
            city: {
                required: "Please select a city"
            },
            pincode: {
                required: "Please enter a valid pincode",
                digits: "Please enter only digits",
                minlength: "Pincode must be 6 digits long",
                maxlength: "Pincode must be 6 digits long"
            },
            goal: {
                required: "Please enter the goal amount",
                digits: "Please enter a valid number"
            },
            description: {
                required: "Please enter a description",
                minlength: "Description must be at least 10 characters long"
            },
            image: {
                required: "Please upload a profile image",
            }
        },
        submitHandler: function(form) {
            var formData = new FormData(form);
            jQuery.ajax({
                url: '/charity/update/',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    if(response.status == 'success'){
                       location.reload();
                    }
                }
            });
        }
    });
})
function previewImages(event) {
    var reader = new FileReader();
    reader.onload = function() {
        var output = document.getElementById('output');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}
