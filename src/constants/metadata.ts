const keywords: string[] = []

const description = "Site description goes here"
const title = "Site title"
const url = `${process.env.NODE_ENV === 'development' ? "http://192.168.0.101:3000": "https://yourdomain.com"}`
const site = "Your app name"
const template = '%s - Base Template for the title'

const authors = {name: "Your name"}
const creator = "Your name / company name"
const publisher = "Your name / company name"

const metadata = {
    authors, creator, description, keywords, publisher, site, template, title, url
}

export default metadata; 