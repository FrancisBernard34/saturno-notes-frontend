import { useState } from "react";

import { useNavigate } from "react-router-dom";

import NoteItem from "../../components/NoteItem";
import Textarea from "../../components/Textarea";
import Section from "../../components/Section";
import Button from "../../components/Button";
import ButtonText from "../../components/ButtonText";
import Header from "../../components/Header";
import Input from "../../components/Input";

import { api } from "../../services/api";

import { Container, Form } from "./styles";

export default function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  // Character limits
  const LIMITS = {
    TITLE: 50,
    DESCRIPTION: 300,
    LINK: 100,
    TAG: 20
  };

  function handleBack() {
    navigate(-1);
  }

  function handleAddLink() {
    if (newLink.length > LIMITS.LINK) {
      return alert(`Link must be no more than ${LIMITS.LINK} characters.`);
    }
    setLinks((prev) => [...prev, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(linkDeleted) {
    setLinks((prev) => prev.filter((link) => link !== linkDeleted));
  }

  function handleAddTag() {
    if (newTag.length > LIMITS.TAG) {
      return alert(`Tag must be no more than ${LIMITS.TAG} characters.`);
    }
    setTags((prev) => [...prev, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(tagDeleted) {
    setTags((prev) => prev.filter((tag) => tag !== tagDeleted));
  }

  async function handleNewNote() {
    if(!title) {
      return alert("Você precisa adicionar um título para a nota.");
    }

    if (title.length > LIMITS.TITLE) {
      return alert(`Título deve ter no máximo ${LIMITS.TITLE} caracteres.`);
    }

    if (description.length > LIMITS.DESCRIPTION) {
      return alert(`Descrição deve ter no máximo ${LIMITS.DESCRIPTION} caracteres.`);
    }

    if (newTag || newLink) {
      return alert(
       "Você precisa adicionar a nova tag e/ou o novo link se quiser salvá-los. Clique para adicionar ou deixe o campo vazio."
      );
    }

    try {
      const response = await api.post("/notes", {
        title,
        description,
        tags,
        links,
      });

      console.log('API Response:', response.data);
      
      if (response.data) {
        alert("Nota criada com sucesso!");
        navigate(-1);
      }
    } catch (error) {
      console.error('Error creating note:', error.response?.data || error.message);
      alert("Erro ao criar a nota. Por favor, tente novamente.");
    }
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText title="Voltar" onClick={handleBack} />
          </header>

          <Input
            placeholder={`Título (máx. ${LIMITS.TITLE} caracteres)`}
            onChange={(e) => {
              const value = e.target.value.slice(0, LIMITS.TITLE);
              setTitle(value);
            }}
            value={title}
          />
          <Textarea
            placeholder={`Observações (máx. ${LIMITS.DESCRIPTION} caracteres)`}
            onChange={(e) => {
              const value = e.target.value.slice(0, LIMITS.DESCRIPTION);
              setDescription(value);
            }}
            value={description}
          />

          <Section title="Links úteis">
            {links.map((link, index) => (
              <NoteItem
                key={String(index)}
                value={link}
                onClick={() => handleRemoveLink(link)}
              />
            ))}
            <NoteItem
              isNew
              placeholder={`Novo link (máx. ${LIMITS.LINK} caracteres)`}
              value={newLink}
              onChange={(e) => {
                const value = e.target.value.slice(0, LIMITS.LINK);
                setNewLink(value);
              }}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteItem
                  key={String(index)}
                  value={tag}
                  onClick={() => handleRemoveTag(tag)}
                />
              ))}

              <NoteItem
                isNew
                placeholder={`Nova tag (máx. ${LIMITS.TAG} caracteres)`}
                onChange={(e) => {
                  const value = e.target.value.slice(0, LIMITS.TAG);
                  setNewTag(value);
                }}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button title="Salvar" onClick={handleNewNote} />
        </Form>
      </main>
    </Container>
  );
}
