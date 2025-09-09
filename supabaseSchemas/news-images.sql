-- Bucket (execute apenas se ainda não existir)
insert into storage.buckets (id, name, public)
values ('news-images', 'news-images', true)
on conflict (id) do nothing;

-- Políticas de Storage
create policy "Public read for news-images"
on storage.objects for select
to anon, authenticated
using ( bucket_id = 'news-images' );

create policy "Authenticated can upload to news-images"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'news-images' );

create policy "Owners can update/delete their images"
on storage.objects for update
to authenticated
using ( bucket_id = 'news-images' and owner = auth.uid() )
with check ( bucket_id = 'news-images' and owner = auth.uid() );

create policy "List images (optional)"
on storage.objects for select
to authenticated
using ( bucket_id = 'news-images' );