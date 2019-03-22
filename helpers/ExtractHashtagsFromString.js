// func splits text into words, if the word starts with '#',
// then push it to the hashtags array
module.exports = function(desc) {
    const words = desc.split(' ');
    let hashtags = [];
    words.forEach(word => {
        if (word.indexOf('#') === 0){
            hashtags.push(word.split('#').pop())
        }
    })
    // transform hashtags array to a uniq hashtags array
    const uniqHashtags = [...new Set(hashtags)]; 
    return uniqHashtags;
}