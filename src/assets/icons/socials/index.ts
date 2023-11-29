// social icons to use in the auth screens 
// you can remove the ones you might not want to use
import  { StaticImageData } from "next/image";

import apple_light from "./apple.png"; 
import apple_dark from "./apple_dark.png"; 
import facebook from "./facebook.png"; 
import github_light from "./github.png"; 
import github_dark from "./github_dark.png";
import google from "./google.png"; 
import instagram from "./instagram.png";
import linkedin_light from "./linkedin.png"; 
import linkedin_dark from "./linkedin_dark.png"; 
import microsoft from "./microsoft.png"; 
import twitter_light from "./twitter.png"; 
import twitter_dark from "./twitter_dark.png"; 

// function gets the social icon based on theme and color
// you can get rid of the icons you might not need
// the default theme is set to dark, but you can use light
const get_social_icon: (title: string, theme?: string) => StaticImageData
 = (title, theme = "dark") => {
    let icon: StaticImageData = google; 

    if (title === "facebook") icon = facebook; 
    if (title === "google") icon = google; 
    if (title === "instagram") icon = instagram; 
    if (title === "microsoft") icon = microsoft;
    
    // these icons can be either dark or light  
    if (title === "apple" && theme === "dark") icon = apple_dark; 
    if (title === "apple" && theme === "light") icon = apple_light;
     
    if (title === "github" && theme === "dark") icon = github_dark; 
    if (title === "github" && theme === "light") icon = github_light;

    if (title === "linkedin" && theme === "dark") icon = linkedin_dark; 
    if (title === "linkedin" && theme === "light") icon = linkedin_light;
     
    if (title === "twitter" && theme === "dark") icon = twitter_dark; 
    if (title === "twitter" && theme === "light") icon = twitter_light;

    return icon; 
}

export {
    get_social_icon
}