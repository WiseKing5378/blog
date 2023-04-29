import ArticleForm from '../UI/ArticleForm';
import { updateArticle } from '../../Store/Articles';

export default function CreateArticle() {
  return <ArticleForm title="Edit article" fn={updateArticle} formType="edit" />;
}
