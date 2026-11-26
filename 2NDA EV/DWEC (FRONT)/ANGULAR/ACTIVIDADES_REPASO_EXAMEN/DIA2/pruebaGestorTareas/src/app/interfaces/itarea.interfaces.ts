export interface Itarea {
  id: number;
  titulo: string;
  descripcion: string;
  completada?: boolean;
  estado: 'To Do' | 'In Progress' | 'Done';
}
