import { useState, useEffect } from "react";
import { Container, Links, Content } from "./styles";
import { useParams, useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import Header from "../../components/Header";
import Button from "../../components/Button";
import ButtonText from "../../components/ButtonText";
import Section from "../../components/Section";
import Tag from "../../components/Tag";

function ensureAbsoluteUrl(url) {
  if (!url) return '#';
  
  try {
    new URL(url);
    return url;
  } catch {
    // If the URL is not valid, try to make it absolute
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  }
}

export default function Details() {
  const [data, setData] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  function handleBack() {
    navigate(-1);
  }

  async function handleRemove() {
    const confirm = window.confirm("Deseja realmente excluir esta nota?");

    if (confirm) {
      await api.delete(`/notes/${id}`);
      navigate(-1);
    }
  }

  useEffect(() => {
    (async function fetchNote() {
      const response = await api.get(`/notes/${id}`);
      setData(response.data);
    })();
  }, [id]);

  return (
    <Container>
      <Header />

      {data && (
        <main>
          <Content>
            <ButtonText 
              title="Excluir nota" 
              onClick={handleRemove} 
              className="delete-button" 
            />

            <h1>{data.title}</h1>

            <p>{data.description}</p>

            {data.links && (
              <Section title="Links úteis">
                <Links>
                  {data.links.map((link) => (
                    <li key={String(link.id)}>
                      <a 
                        href={ensureAbsoluteUrl(link.url)} 
                        target="_blank" 
                        rel="noreferrer noopener"
                      >
                        {link.url}
                      </a>
                    </li>
                  ))}
                </Links>
              </Section>
            )}

            {data.tags && (
              <Section title="Marcadores">
                {data.tags.map((tag) => (
                  <Tag key={String(tag.id)} title={tag.name} />
                ))}
              </Section>
            )}

            <Button title="Voltar" onClick={handleBack} />
          </Content>
        </main>
      )}
    </Container>
  );
}
