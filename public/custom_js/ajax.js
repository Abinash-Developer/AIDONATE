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
})