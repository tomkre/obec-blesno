update article
set root_category = parent.category
from article parent
where parent.id = article.category;

update article
set root_category = article.category
where not exists (select id from article parent where parent.id = article.category);
