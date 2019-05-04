import styled from '@emotion/styled'

const ArticleSnippet = ({ title, preview }) => {
  return (
    <div
      css={{
        padding: '2em',
        marginBottom: '1.5em',
        borderRadius: '7px',
        boxShadow: '0px 0px 21px rgba(0, 0, 0, 0.1)'
      }}
    >
      <h2 css={{ marginBottom: '1em' }}>{title}</h2>
      <p
        css={{
          fontWeight: 300,
          color: 'dimGrey'
        }}
      >
        {preview}
      </p>
    </div>
  )
}

export { ArticleSnippet }
