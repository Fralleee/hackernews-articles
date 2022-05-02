import useTimeAgo from '@dh-react-hooks/use-timeago';
import styled from 'styled-components';
import { FaClock, FaCommentAlt, FaExternalLinkAlt, FaEyeSlash, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// #region styled
const Row = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--bg-light);
`;

const Score = styled.div`
  padding: 1em;
  align-self: stretch;
  display: grid;
  width: 5em;
  place-items: center;
  font-weight: bold;
  background-color: var(--bg-accent);
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1em 2em;
  border-left: 1px solid var(--border);
`;

const Title = styled.a`
  font-weight: 500;
  color: var(--text);
  font-size: 1.125rem;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5em;
  color: var(--text-light);
  font-weight: 500;
  font-size: 90%;

  svg {
    margin-right: 0.25em;
  }
`;

const Divider = styled.span`
  margin: 0 0.5em;
`;

const HideButton = styled.button`
  margin-right: 1em;
  display: flex;
  align-items: center;
  svg {
    margin-right: 0.5em;
  }
`;
// #endregion

type PropTypes = {
  article: Article;
  setHidden: React.Dispatch<React.SetStateAction<Number[]>>;
};
const ArticleListItem = ({ article, setHidden }: PropTypes) => {
  const HandleHide = () => setHidden(prevState => [...prevState, article.objectID]);
  return (
    <Row>
      <Score>{article.points}</Score>
      <Content>
        <Title href={article.url} title={article.title}>
          {article.title}
          {article.url && (
            <>
              <Divider>-</Divider>
              <small>
                {new URL(article.url).hostname} <FaExternalLinkAlt />
              </small>
            </>
          )}
        </Title>
        <Meta>
          <Link to={`article/${article.objectID}`} title={article.title}>
            <FaCommentAlt /> {article.num_comments} Comments
          </Link>
          <Divider />
          <FaUser /> {article.author}
          <Divider />
          <FaClock /> {useTimeAgo(article.created_at)}
        </Meta>
      </Content>
      <HideButton onClick={HandleHide} title={`Hide ${article.title}`}>
        <FaEyeSlash /> Hide
      </HideButton>
    </Row>
  );
};

export default ArticleListItem;
