export default async function({ route, store }) {
  await store.dispatch('offers/fetchOffers');
}
