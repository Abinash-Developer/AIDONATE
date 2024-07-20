const convertToSlug = async (title)=>{
    return title
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9]+/g, '-') // Replace special characters with hyphens
    .replace(/^-+|-$/g, '') 
}
module.exports = {convertToSlug};