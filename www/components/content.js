import styled from '@emotion/styled'

const ArticleSnippet = ({ title, preview }) => {
  return (
    <div
      css={{
        marginBottom: '1.5em',
        padding: '2em',
        borderRadius: '7px',
        boxShadow: '0px 0px 21px rgba(0, 0, 0, 0.1)'
      }}
    >
      <h3 css={{ marginBottom: '1em' }}>{title}</h3>
      <p css={{ paddingLeft: 0 }}>{preview}</p>
    </div>
  )
}

export { ArticleSnippet }
