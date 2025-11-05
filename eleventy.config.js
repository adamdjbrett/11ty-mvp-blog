import { DateTime } from "luxon";

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  
  
  // Year shortcode (usage: {% year %})
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Nunjucks date filter (usage: {{ someDate | date("yyyy-LL-dd") }})
  eleventyConfig.addNunjucksFilter("date", function(dateObj, format = "yyyy-LL-dd") {
    if (!dateObj) {
      return "";
    }
    // Support Date instances and date-like strings
    const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
    return DateTime.fromJSDate(d, { zone: "utc" }).toFormat(format);
  });


  eleventyConfig.addCollection("posts", (collection) =>
    collection.getFilteredByGlob("src/blog/**/*.md").sort((a, b) => b.date - a.date)
  );
  return {
    dir: { input: "src", includes: "_includes", layouts: "_layouts" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
