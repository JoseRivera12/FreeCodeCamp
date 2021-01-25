const sha1 = require("js-sha1");
const urlCtrl = {};

//Model
const Url = require("../models/Url");

//Test API
urlCtrl.sayHello = (req, res) => {
    res.json({ greeting: "hello API" });
};

//Create a new URL
urlCtrl.newUrl = async (req, res) => {
    //regex to validate URL
    let regex = new RegExp(
        "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
    );
    if (regex.test(req.body.url)) {
        //take only the first four caracters
        let short_url = sha1(req.body.url).substring(0, 4);
        const url = new Url({ original_url: req.body.url, short_url: short_url });
        const newUrl = await url.save();
        res.json({
            original_url: newUrl.original_url,
            short_url: newUrl.short_url,
        });
    } else {
        res.json({ error: "Invalid URL" });
    }
};

//Redirect to original URL
urlCtrl.getUrl = (req, res) => {
    //regex to check if URL have http?
    let regex = new RegExp("^(http|https)://");
    Url.findOne({ short_url: req.params.id }, (err, data) => {
        if (err) return console.error(err);
        if (data) {
            if (regex.test(data.original_url)) {
                res.redirect(data.original_url);
            } else {
                //If not http add to dont redirect in the same page
                res.redirect(`https://${data.original_url}`);
            }
        } else {
            res.json({ error: "Invalid URL" });
        }
    });
};

module.exports = urlCtrl;
