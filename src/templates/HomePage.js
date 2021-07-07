import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Layout from '../components/Layout'
import PostSection from '../components/PostSection'

// Export Template for use in CMS preview
export const HomePageTemplate = ({ title, subtitle, featuredImage, body, posts }) => (
  <main className="Home">
    <PageHeader
      large
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />

    <section className="section">
      <div className="container">
        <Content source={body} />
      </div>
    </section>
    {!!posts.length && (
      <section className="section">
        <div className="container">
          <PostSection posts={posts} />
        </div>
      </section>
    )}
  </main>
)

// Export Default HomePage for front-end
const HomePage = ({ data: { page, posts } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <HomePageTemplate
      {...page}
      {...page.frontmatter}
      body={page.html}
      posts={posts && posts.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
      }
    }

    posts: allMarkdownRemark(
      filter: {fields: {contentType: {eq: "posts"}}, frontmatter: {categories: {elemMatch: {category: {eq: "Articles"}}}}}
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            categories {
              category
            }
            featuredImage
          }
        }
      }
    }
  }
`
