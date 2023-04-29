import ArticleForm from '../UI/ArticleForm';
import { createArticle } from '../../Store/Articles';

export default function CreateArticle() {
  return <ArticleForm title="Create new article" fn={createArticle} />;
}
