import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { Container, Brand, Menu, Search, Content, NewNote } from "./styles";

import { api } from "../../services/api";

import Header from "../../components/Header";
import Input from "../../components/Input";
import Note from "../../components/Note";
import Section from "../../components/Section";
import ButtonText from "../../components/ButtonText";
import { MobileMenu } from "../../components/MobileMenu";

export default function Home() {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  function handleTagSelected(tagName) {
    const alreadySelected = tagsSelected.includes(tagName);

    if (alreadySelected) {
      const filteredTags = tagsSelected.filter((tag) => tag !== tagName);
      setTagsSelected(filteredTags);
    } else {
      setTagsSelected([...tagsSelected, tagName]);
    }
  }

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  useEffect(() => {
    (async function fetchTags() {
      const response = await api.get("/tags");
      setTags(response.data);
    })();
  }, []);

  useEffect(() => {
    (async function fetchNotes() {
      const response = await api.get(
        `/notes?title=${search}&tags=${tagsSelected}`
      );
      setNotes(response.data);
    })();
  }, [tagsSelected, search]);

  const menuContent = (
    <>
      <li>
        <ButtonText
          title="Todos"
          onClick={() => setTagsSelected([])}
          $isactive={tagsSelected.length === 0}
        />
      </li>
      {tags &&
        tags.map((tag) => (
          <li key={String(tag.id)}>
            <ButtonText
              title={tag.name}
              onClick={() => handleTagSelected(tag.name)}
              $isactive={tagsSelected.includes(tag.name)}
            />
          </li>
        ))}
    </>
  );

  return (
    <Container>
      <Brand>
        <h1>SaturnoNotes</h1>
      </Brand>

      <Header />

      <Menu>
        {menuContent}
      </Menu>

      <MobileMenu>
        {menuContent}
      </MobileMenu>

      <Search>
        <Input
          placeholder="Pesquisar pelo título"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {notes &&
            notes.map((note) => (
              <Note
                key={String(note.id)}
                data={note}
                onClick={() => handleDetails(note.id)}
              />
            ))}
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  );
}
