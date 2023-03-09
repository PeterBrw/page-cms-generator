const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

const redirects = [
    {
        fromPath: '/blog/ISO%2027001%20certification-standard-policies-procedures',
        toPath: '/blog/ISO-27001-certification-standard-policies-procedures/'
    },
    {
        fromPath: '/blog/cloud-native-application-protection-platform-cnapp-cspm-cwpp',
        toPath: '/blog/cnapp-a-mix-of-cspm-cwpp/'
    },
    {
        fromPath: '/startups',
        toPath: '/security-for-startups-program'
    },
    {
        fromPath: '/blog/AWS-SOC%202-Compliance-Checklist-A-Detailed-Guide',
        toPath: '/blog/AWS-SOC-2-Compliance-Checklist-A-Detailed-Guide/'
    }
];

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` });

        createNodeField({
            node,
            name: `slug`,
            value: slug
        });
    }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage, createRedirect } = actions;

    for (let i = 0; i < redirects.length; i++) {
        createRedirect({
            fromPath: redirects[i].fromPath,
            toPath: redirects[i].toPath,
            isPermanent: true,
            redirectInBrowser: true
        });
        createRedirect({
            fromPath: redirects[i].fromPath + '/',
            toPath: redirects[i].toPath,
            isPermanent: true,
            redirectInBrowser: true
        });
    }

    const blogTemplate = path.resolve(`src/template/blogTemplate.js`);
    const jsonTemplate = path.resolve(`src/template/jsonPageTemplate.js`);

    // JSON Pages
    await graphql(`
        query MyQuery {
            allFile(filter: { extension: { eq: "json" } }) {
                edges {
                    node {
                        childrenJson {
                            sections
                            seoTitle
                            title
                        }
                    }
                }
            }
        }
    `).then((result) => {
        if (result.errors) throw result.errors;

        const posts = result.data.allFile.edges;

        posts.forEach((edge) => {
            const node = edge.node;
            createPage({
                // Path for this page — required
                path: '/pagesjson/' + node.childrenJson[0].seoTitle + '/',
                component: jsonTemplate,
                context: {
                    alldata: node.childrenJson[0]
                }
            });
        });
    });

    // Markdown Pages
    await graphql(`
        query MarkdownPages {
            allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "pages" } } }) {
                edges {
                    node {
                        frontmatter {
                            title
                            seoTitle
                            categoryPath
                            sections
                            hero {
                                herobackground
                                heroimage {
                                    publicURL
                                    childImageSharp {
                                        gatsbyImageData(width: 1920, layout: CONSTRAINED)
                                    }
                                }
                                customComponents
                                heromarkdown
                            }
                            textImageRow {
                                rowImagePosition
                                rowImage {
                                    publicURL
                                    childImageSharp {
                                        gatsbyImageData(width: 1920, layout: CONSTRAINED)
                                    }
                                }
                                rowAlt
                                rowSubtitle
                                customComponents
                                rowMarkdown
                                rowBackground
                            }
                            featuresSection {
                                featureTitle
                                featureText
                            }
                            ctaSection {
                                ctaMarkdown
                            }
                        }
                    }
                }
            }
        }
    `).then((result) => {
        if (result.errors) {
            reporter.panicOnBuild(`There was an error loading your blog posts`, result.errors);
            return;
        }

        const posts = result.data.allMarkdownRemark.edges;

        if (posts.length > 0) {
            posts.forEach((edge) => {
                const node = edge.node;
                console.log(node);
                console.log(`/${node.frontmatter.categoryPath}/${node.frontmatter.seoTitle}/`);
                createPage({
                    // Path for this page — required
                    path: `/${node.frontmatter.categoryPath}/${node.frontmatter.seoTitle}/`,
                    component: blogTemplate,
                    context: {
                        alldata: node
                    }
                });
            });
        }
    });
};

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;

    createTypes(`
    type MarkdownRemark implements Node {
        frontmatter: Frontmatter
        rawMarkdownBody: String
    }
    
    type Frontmatter {
        templateKey: String
        title: String
        seoTitle: String
        categoryPath: String
        sections: [String]
        hero: Hero
        authors: String
        categories: [String]
        title: String
        description: String
        seoDescription: String
        date: Date @dateformat
        permalink: String
        featuredimage: File @fileByRelativePath
        featuredpost: Boolean
        textImageRow: [TextImageRow]
        markdownBody: String
        sections: [String]
        featuresSection: [FeaturesSection]
        ctaSection: CTA
    }
    
    type FeaturesSection {
        icon: Boolean
        featureTitle: String
        featureText: String
    }
    
    type CTA {
        ctaMarkdown: String
    }

    type TextImageRow {
        rowImagePosition: String
        rowImage: File @fileByRelativePath
        rowAlt: String
        rowSubtitle: String
        customComponents: Boolean
        rowMarkdown: String
        rowBackground: String
    }
    
    type Hero {
        herobackground: String
        heroimage: File @fileByRelativePath
        customComponents: Boolean
        heromarkdown: String
    }
    
    type FirstSection {
        rightsectionimage: File @fileByRelativePath
        rightsectionsubtitle: String
        rightmarkdown: String
    }
    
    type LeftSection {
        leftsectionsubtitle: String
        leftsectionimage: File @fileByRelativePath
        leftmarkdown: String
    }
  `);
};
