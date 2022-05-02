/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from 'react-router-dom';
import { hackernewsApi } from 'services/hackernews';
import Error from 'components/common/Error';
import Loader from 'components/common/Loader';
import { FaUser, FaClock } from 'react-icons/fa';
import styled from 'styled-components';
import useTimeAgo from '@dh-react-hooks/use-timeago';

// #region styled
const Details = styled.div`
  background-color: var(--bg-light);
  width: 100%;
  padding: 1em;
  margin-top: 5em;
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

const Comments = styled.ul`
  margin-top: 2em;
  margin-left: -0.5em;
`;
const Comment = styled.li`
  padding-left: 0.5em;
`;

const Divider = styled.span`
  margin: 0 0.5em;
`;
// #endregion

const RenderComments = (article: Article, isRoot?: boolean) => {
  return (
    <Comment>
      {!isRoot && (
        <>
          <h4>{article.author}</h4>
          {article.text}
        </>
      )}
      {article.children && article.children.map(a => RenderComments(a))}
    </Comment>
  );
};

function ArticleDetails() {
  const { id } = useParams();
  const { data, error, isLoading } = hackernewsApi.useGetArticleByIdQuery(id);

  if (isLoading) return <Loader />;
  if (!data) return <Error error={error} />;

  const { author, title, url, created_at } = data;
  return (
    <Details>
      <header>
        <h1>{title}</h1>
        <a href={url} title={title}>
          {url}
        </a>
        <Meta>
          <FaUser /> {author}
          <Divider />
          <FaClock /> {useTimeAgo(created_at)}
        </Meta>
      </header>
      <Comments>{RenderComments(data, true)}</Comments>
    </Details>
  );
}

export default ArticleDetails;
