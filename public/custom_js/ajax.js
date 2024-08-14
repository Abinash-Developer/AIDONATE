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