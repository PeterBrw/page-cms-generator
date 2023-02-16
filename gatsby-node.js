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

const postsByCategory = {};
const postsPerPage = 9;

exports.createPages = async ({ graphql, actions }) => {
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
                            sections
                            hero {
                                herobackground {
                                    publicURL
                                }
                                heroimage {
                                    publicURL
                                }
                                heromarkdown
                            }
                            firstsection {
                                rightsectionimage {
                                    publicURL
                                }
                                rightsectionsubtitle
                                rightmarkdown
                            }
                            leftsection {
                                leftsectionsubtitle
                                leftsectionimage {
                                    publicURL
                                }
                                leftmarkdown
                            }
                        }
                    }
                }
            }
        }
    `).then((result) => {
        if (result.errors) throw result.errors;

        const posts = result.data.allMarkdownRemark.edges;

        // console.log({ posts });

        posts.forEach((edge) => {
            const node = edge.node;
            console.log({ page: node.frontmatter.seoTitle });
            createPage({
                // Path for this page — required
                path: '/markdownpage/' + node.frontmatter.seoTitle + '/',
                component: blogTemplate,
                context: {
                    alldata: node
                }
            });
        });
    });
};
