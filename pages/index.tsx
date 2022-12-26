import { gql } from "@apollo/client";
import client from "../apollo-client";

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query getEntries {
        entries {
          id
          title
          message
        }
      }
    `,
  });

  return {
    props: {
      entries: data.entries,
    },
  };
}

interface Entry {
  id: number;
  title: string;
  message: string;
}

export default function Home({ entries }: { entries: [Entry] }) {
  console.log("noah - pages - index.tsx - entries: ", entries);
  return (
    <div>
      <div>
        {entries.map((entry: Entry, index) => (
          <div key={index}>{`${entry.title} - ${entry.message}`}</div>
        ))}
      </div>
    </div>
  );
}
